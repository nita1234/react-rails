class Api::V1::SessionsController < Api::V1::BaseController
  respond_to :json
  def create
    user = User.where(email: params[:user][:email]).first
    if user && user.valid_password?(params[:user][:password])
      render json: user.as_json(only: [:email,:authentication_token]), status: :created
    else
      head(:unauthorized)
    end
  end
end