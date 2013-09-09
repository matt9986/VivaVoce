collection @reviews
attributes :id, :body
node(:updated_at){ |review| review.updated_at.rfc2822 }
node(:stars){|review| review.stars.value }
node(:author_name){|review| review.user.username}