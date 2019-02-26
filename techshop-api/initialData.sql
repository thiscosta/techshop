use techshop;
insert into user(id, name, username, password, email, phone, role, is_enabled, confirm_hash, last_confirm_solicitation) values('bde29048-9eb1-4b83-8506-c3ed9b0592a1','Thiago Costa', 'thiscosta', '123', 'thiscosta@email.com', '12345678', 'System Administrator', 1, 'fb6ba3ce-d872-41ad-afe6-8a2f14f36602', 0);

INSERT INTO oauth_client_details
    (client_id, client_secret, scope, authorized_grant_types,
    web_server_redirect_uri, authorities, access_token_validity,
    refresh_token_validity, additional_information, autoapprove)
VALUES
    ("techshop-web-app", "techshop-web-secret", "read,write",
    "password,authorization_code,refresh_token", null, null, 36000, 160000, null, true);
    
insert into product(id, name, description, type, price) values('ba3117f4-fa22-4254-a112-461ef4013d79', 'Notebook', 'i7 7th gen, 16GB RAM, 1TB HD, 480GB SSD 19 inches screen', 'Eletronic', 5000);
insert into address(id, country, state, city, neighborhood, street, number, zip_code) values ('430ede6f-9de3-451b-a463-f08e93f763db', 'Brasil', 'São Paulo', 'Hortolândia', 'Jardim Santana', 'Rua Luiza Lopes Garcia', '529', '13184-350');

insert into client(id, name, address_id, credit) values('2b07d551-c20f-4896-8a22-f4da02232334', 'Dell', '430ede6f-9de3-451b-a463-f08e93f763db', 50000);