$(function(){

  function buildHTML(message){
    if (message.image){
      if (message.body && message.image) {
        var html =
        `<div class="mainchat__messages__message" data-message-id=${message.id}>
          <div class="mainchat__messages__message__header">
            <div class="mainchat__messages__message__header__user-name">
              ${message.user_name}
            </div>
            <div class="mainchat__messages__message__header__day">
              ${message.created_at}
            </div>
          </div>
          <div class="mainchat__messages__message__content">
            <p>${message.body}</p>
            <img src=${message.image} >
          </div>
        </div>`
      return html;
      } else {
        var html =
        `<div class="mainchat__messages__message" data-message-id=${message.id}>
          <div class="mainchat__messages__message__header">
            <div class="mainchat__messages__message__header__user-name">
              ${message.user_name}
            </div>
            <div class="mainchat__messages__message__header__day">
              ${message.created_at}
            </div>
          </div>
          <div class="mainchat__messages__message__content">
            <img src=${message.image} >
          </div>
        </div>`
      return html;
      }
      
    } else {
      var html =
        `<div class="mainchat__messages__message" data-message-id=${message.id}>
          <div class="mainchat__messages__message__header">
            <div class="mainchat__messages__message__header__user-name">
              ${message.user_name}
            </div>
            <div class="mainchat__messages__message__header__day">
              ${message.created_at}
            </div>
          </div>
          <div class="mainchat__messages__message__content">
            ${message.body}
          </div>
        </div>`
      return html;
    };
  }

  var reloadMessages = function() {
    var last_message_id = $('.mainchat__messages__message:last').data("message-id");
    $.ajax ({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.mainchat__messages').append(insertHTML);
        $('.mainchat__messages').animate({ scrollTop: $('.mainchat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.mainchat__messages').append(html);
      $('.mainchat__messages').animate({ scrollTop: $('.mainchat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.mainchat__messageform__content__send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});