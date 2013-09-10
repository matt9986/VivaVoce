collection @uploads
attributes :id, :title
node(:author){ |upload| upload.user.username }
node(:url){ |upload| upload.photo.url }
node(:tiny){ |upload| upload.photo.url(:tiny) }
node(:thumbUrl){ |upload| upload.photo.url(:thumb) }
node(:updated_at){ |upload| upload.updated_at.rfc2822 }