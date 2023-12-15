FactoryBot.define do
  factory :comment do
    comment_text { "MyText" }
    rating { 10 }
    user
    tour
  end
end