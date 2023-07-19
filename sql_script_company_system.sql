create database company_system

use [company_system]
go
create table personal (
id int,
name varchar(255),
emailAddress varchar(255),
password varchar(255),
team varchar(255),
joinedAt date,
avatar varchar(255),
PRIMARY KEY (id),
)

go
create table project(
   id varchar(10) NOT NULL,
   name varchar(255),
   score int,
   durationInDays int,
   bugsCount int,
   madeDadeline bit,
   personalId int,
   PRIMARY KEY (id),
);

