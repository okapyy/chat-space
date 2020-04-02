$(function(){
  function buildHTML(message){
    if (message.image.url){
      if (message.body && message.image.url) {
        var html =
        `<div class="mainchat__messages__message">
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
            <img src=${message.image.url} >
          </div>
        </div>`
      return html;
      } else {
        var html =
        `<div class="mainchat__messages__message">
          <div class="mainchat__messages__message__header">
            <div class="mainchat__messages__message__header__user-name">
              ${message.user_name}
            </div>
            <div class="mainchat__messages__message__header__day">
              ${message.created_at}
            </div>
          </div>
          <div class="mainchat__messages__message__content">
            <img src=${message.image.url} >
          </div>
        </div>`
      return html;
      }
      
    } else {
      var html =
        `<div class="mainchat__messages__message">
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
});