require 'rails_helper'

RSpec.describe Message, type: :medel do
  describe '#create' do

    context '保存できる場合' do
      it "bodyの入力があれば保存されるか" do
        expect(build(:message, image: nil)).to be_valid
      end
  
      it "画像の入力があれば保存されるか" do
        expect(build(:message, body: nil)).to be_valid
      end
  
      it "bodyと画像の入力があれば保存されるか" do
        expect(build(:message)).to be_valid
      end
    end

    context '保存されない場合' do
      it "bodyと画像の入力がなければ保存されないか" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end
  
      it "group_idがなければ保存されないか" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
  
      it "user_idがなければ保存されないか" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end