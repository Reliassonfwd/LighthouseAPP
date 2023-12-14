# Api::V1::CommentsController
#
# This controller handles API requests related to comments.

class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # Index action
  # If a tourId parameter is provided, it fetches all comments associated with that tour, including the user and tour details.
  # If no tourId is provided, it fetches all comments, including the user and tour details.
  # The results are rendered in JSON format.
  def index
    if params[:tourId]
      @comments = Comment.includes(:user, :tour).where(tour_id: params[:tourId])
    else
      @comments = Comment.includes(:user, :tour).all
    end
    render json: @comments.as_json(include: { user: { only: [:name] }, tour: { only: [:name] } })
  end

  # Show action
  # Fetches a specific comment by ID and renders it in JSON format.
  def show
    render json: @comment
  end

  # Create action
  # Creates a new comment with the provided parameters. If the comment is successfully saved, it is rendered in JSON format with a status of :created. 
  # If the comment fails to save, the errors are rendered in JSON format with a status of :unprocessable_entity.
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # Update action
  # Updates a specific comment with the provided parameters. If the comment is successfully updated, it is rendered in JSON format. 
  # If the comment fails to update, the errors are rendered in JSON format with a status of :unprocessable_entity.
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # Destroy action
  # Deletes a specific comment by ID and returns a status of :no_content.
  def destroy
    @comment.destroy
    head :no_content
  end

  private
    # set_comment method
    # Fetches a specific comment by ID.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # comment_params method
    # Specifies the permitted parameters for a comment.
    def comment_params
      params.require(:comment).permit(:comment_text , :rating , :user_id, :tour_id)
    end
end
