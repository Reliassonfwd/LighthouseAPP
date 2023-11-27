class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy, :create]



  def index
    @comments = Comment.includes(:user, :tour).all
    render json: @comments.as_json(include: { user: { only: [:name] }, tour: { only: [:name] } })
  end

  def show
    render json: @comment
  end

  def new
    @comment = Comment.new
  end

  def edit;end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      redirect_to @comment, notice: 'Comment was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @comment.destroy
    redirect_to comments_url, notice: 'Comment was successfully destroyed.'
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:comment_text, :rating, :user_id, :tour_id)
    end
end
