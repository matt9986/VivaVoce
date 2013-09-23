collection @reviews
attributes :id, :body
node(:updated_at){ |review| review.updated_at.rfc2822 }
node(:stars){|review| review.stars ? review.stars.value : nil }
node(:votes){|review| review.reputations.first ? review.reputations.first.value : nil }
node(:author_name){|review| review.user.username }