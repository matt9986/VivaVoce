collection @reviews
attributes :id, :body
node(:updated_at){ |review| review.updated_at.rfc2822 }
node(:stars){|review| nil }
node(:author_name){|review| review.user.username}