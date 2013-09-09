object @review
attributes :id, :body
node(:updated_at){ |review| review.updated_at.rfc2822 }
node(:stars){|review| review.stars.value }
node(:votes){|review| review.reputation_for(:votes) }
node(:author_name){|review| review.user.username }