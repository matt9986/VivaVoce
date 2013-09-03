collection @reviews
attributes :id, :body
node(:stars){|review| nil }
node(:author_name){|review| review.user.username}