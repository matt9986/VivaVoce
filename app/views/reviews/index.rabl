collection @reviews
attributes :id, :body, :updated_at
node(:stars){|review| nil }
node(:author_name){|review| review.user.username}