drop schema if exists techshop;
create schema techshop;

use techshop;

create table if not exists user (
	id varchar(50) not null primary key,
	name varchar(100) not null,
	username varchar(100) not null UNIQUE,
	password varchar(50) not null,
	email varchar(100) UNIQUE,
	phone varchar(15) UNIQUE,
	role varchar(50) not null,
    is_enabled tinyint not null,
    confirm_hash varchar(100) not null,
    last_confirm_solicitation long
);

create table if not exists oauth_client_details (
    client_id varchar(256) PRIMARY KEY,
    resource_ids varchar(256),
    client_secret varchar(256),
    scope varchar(256),
    authorized_grant_types varchar(256),
    web_server_redirect_uri varchar(256),
    authorities varchar(256),
    access_token_validity integer,
    refresh_token_validity integer,
    additional_information varchar(4096),
    autoapprove varchar(256)
);

create table if not exists product (
	id varchar(50) not null primary key,
    name varchar(75) not null UNIQUE,
    description varchar(1000),
    type varchar(50) not null,
    price double not null
);

create table if not exists address(
	id varchar(50) not null primary key,
    country varchar(40) not null,
    state varchar(40) not null,
    city varchar(40) not null,
    neighborhood varchar(40),
    street varchar(100) not null,
    number varchar(6) not null,
    zip_code varchar(10) not null
);

create table if not exists client (
	id varchar(50) not null primary key,
    name varchar(150) not null UNIQUE,
	address_id varchar(50) not null,
    credit double not null,
    constraint fk_address_client foreign key (address_id) references address(id) on update cascade on delete cascade
);

create table if not exists sale (
	id varchar(50) not null primary key,
    seller_id varchar(50) not null,
    client_id varchar(50) not null,
    price double not null,
    shipping double not null,
    date long not null,
	constraint fk_seller_sale foreign key (seller_id) references user(id) on update cascade on delete cascade,
	constraint fk_client_sale foreign key (client_id) references client(id) on update cascade on delete cascade
);

create table if not exists sale_item(
	id varchar(50) not null primary key,
    sale_id varchar(50) not null,
    product_id varchar(50) not null,
    quantity int(7) not null,
	constraint fk_sale_item foreign key (sale_id) references sale(id) on update cascade on delete cascade,
	constraint fk_product_item foreign key (product_id) references product(id) on update cascade on delete cascade
);