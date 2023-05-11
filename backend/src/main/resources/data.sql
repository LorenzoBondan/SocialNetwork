INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1270067126/pt/foto/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Uxyoin6A5yJLc_a8XLeukKteiTZmenne9t38Isz0QS4=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);

INSERT INTO tb_user_followers (user_id, follower_id) VALUES (1,2);
INSERT INTO tb_user_followers (user_id, follower_id) VALUES (3,1);

INSERT INTO tb_user_following (user_id, following_id) VALUES (2,1);
INSERT INTO tb_user_following (user_id, following_id) VALUES (1,3);

INSERT INTO tb_post (title, description, date, user_id) VALUES ('My first post', 'Hello, welcome to my profile, this is my first post!', TIMESTAMP WITH TIME ZONE '2020-07-14T10:30:00Z', 1);
INSERT INTO tb_post (title, description, date, user_id) VALUES ('Follow Me', 'Hi guys, dont you forget to follow me!!', TIMESTAMP WITH TIME ZONE '2022-08-20T12:45:16Z', 2);
INSERT INTO tb_post (title, description, date, user_id) VALUES ('I got a promotion on my job!', 'I am glad to share with you that I got a promotion on my job! Lets celebrate!', TIMESTAMP WITH TIME ZONE '2023-02-18T21:20:10Z', 3);

INSERT INTO tb_comment (description, user_id, post_id) VALUES ('Hi girl! How are you?', 1, 2);
INSERT INTO tb_comment (description, user_id, post_id) VALUES ('I saw you yesterday on the gym', 3, 2);
INSERT INTO tb_comment (description, user_id, post_id) VALUES ('Hello Alex, Its Bob here', 3, 1);

INSERT INTO tb_like (user_id, post_id) VALUES (1,2);
INSERT INTO tb_like (user_id, post_id) VALUES (3,2);
INSERT INTO tb_like (user_id, post_id) VALUES (2,1);