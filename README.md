# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|integer|null: false|
|email|string|null: false|
|password|integer|null: false|
### Association
- has_many: groups_users
- has_many: message

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|integer|null: false|
### Association
- has_many: groups_users
- has_many: message

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|string|null: false|
|image|string|null: false|
### Association
- belongs_to :user
- belongs_to :group
