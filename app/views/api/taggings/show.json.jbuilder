json.set! @tagging.tag.id do
  json.partial! './api/taggings/tagging', tagging: @tagging
end
