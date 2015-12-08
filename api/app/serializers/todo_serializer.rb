class TodoSerializer < ActiveModel::Serializer
  attributes :id, :completed, :title, :client_id
end
