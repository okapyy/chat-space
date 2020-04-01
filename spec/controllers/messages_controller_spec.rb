require 'rails_helper'

describe MessagesController do

  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'ログインしている場合' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'indexアクションのインスタンス変数(@message)が期待する値か' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'indexアクションのインスタンス変数(@group)が期待する値か' do
        expect(assigns(:group)).to eq group
      end

      it 'indexアクションでindex.html.erbに遷移するか' do
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない場合' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'リダイレクトのビューが正しいか' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'ログインしているか場合' do
      before do
        login user
      end

      context '保存に成功した場合' do
        subject {
          post :create,
          params: params
        }

        it 'messageの保存ができたか' do
          expect{ subject }.to change(Message, :count).by(1)
        end
  
        it '保存後のビューに遷移しているか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context '保存が失敗した場合' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'messageの保存ができなかったか' do
          expect{ subject }.not_to change(Message, :count)
        end
  
        it '再び作成ページに遷移しているか' do
          subject
          expect(response).to render_template :index
        end
      end

    end

    context 'ログインしていない場合' do
      it '新規登録画面に遷移しているか' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end

end