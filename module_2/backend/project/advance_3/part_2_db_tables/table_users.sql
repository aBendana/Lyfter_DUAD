SET search_path TO lyfter_ecommerce_pets;

DROP TYPE IF EXISTS rol_type;
CREATE TYPE rol_type AS ENUM ('administrator', 'client');

CREATE TABLE lyfter_ecommerce_pets.users
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying(40) NOT NULL,
    email character varying(40) UNIQUE NOT NULL,
    password character varying(20) NOT NULL,
    phone_number character varying(15) NOT NULL,
    rol rol_type NOT NULL
);


insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Lian Torrese', 'ltorrese0@vkontakte.ru', 'cM5/A$}yD7i(#', '6013678221', 'administrator');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Sibelle Wadesworth', 'swadesworth1@tuttocitta.it', 'vE3._.irh', '9717902256', 'administrator');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Inna Quenell', 'iquenell2@java.com', 'cW3+X/J>?*#3Z>''j', '5068061915', 'administrator');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Chan Devanny', 'cdevanny3@google.com.hk', 'cA5>4fY%!}hV>#', '9123122991', 'administrator');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Murry Polon', 'mpolon4@loc.gov', 'mX4!6NM|.SyISV1', '9156601340', 'administrator');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Lita Probate', 'lprobate5@umich.edu', 'nO3>$JI&\@$z"7MN', '6369315353', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Gregoor Skinley', 'gskinley6@vk.com', 'tV1''.blSp7>HNatb', '5509464498', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Todd Monument', 'tmonument7@cocolog-nifty.com', 'eR1{,|(L{xDc{', '4438501878', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Lyda Hebditch', 'lhebditch8@xinhuanet.com', 'kS0}ByfnJ', '4085504209', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Pall Winterborne', 'pwinterborne9@state.gov', 'cW6,@c>T@!', '8033814935', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Lyndel Kingcott', 'lkingcotta@baidu.com', 'qN8~>hV2BG"j', '3757140089', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Candie Batt', 'cbattb@vistaprint.com', 'jG3+@@A?}bSoOXqU', '3672683847', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Zitella Jennens', 'zjennensc@admin.ch', 'yV3%%0~5lai', '4207265906', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Diann Stothert', 'dstothertd@virginia.edu', 'eH3&t=*k"Q', '3932130993', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Camila Crouch', 'ccrouche@apple.com', 'yM6,wDex', '4051126557', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Tana Ivons', 'tivonsf@acquirethisname.com', 'kW4!<AWWm%n', '6009363810', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Cherry Lytell', 'clytellg@goodreads.com', 'wC4}t+!Vs', '2767409731', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Lucienne Christophersen', 'lchristophersenh@webmd.com', 'nV5%1DH&,u+N', '3043157400', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Traci Hurlin', 'thurlini@house.gov', 'mL5}X!Bgqy', '8457307910', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Florri New', 'fnewj@ifeng.com', 'pQ1?wYrWWh1y', '9894335333', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Dudley Maclean', 'dmacleank@multiply.com', 'vK2>8kZS5/rV', '2959673967', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Kore Di Francesco', 'kdil@pagesperso-orange.fr', 'rW5!.''!TI+wW', '9796972861', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Lesley Criag', 'lcriagm@bizjournals.com', 'bQ8}6ROy/f?#z', '6635326893', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Kevan Fidian', 'kfidiann@cloudflare.com', 'wL8!(V!BVxJV<6Y', '2151905058', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Robyn Carse', 'rcarseo@ebay.com', 'pH9~~}uJ/o?JsL{', '4366228020', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Xavier Meins', 'xmeinsp@slate.com', 'dD4,tuZp''<=~jM1t', '3385844811', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Perla Filimore', 'pfilimoreq@goodreads.com', 'cG7=J>J6o>X\tW', '4812947954', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Oralee Phelan', 'ophelanr@github.com', 'eR5,L9v"B', '5552517778', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Jodi Coleshill', 'jcoleshills@instagram.com', 'bV1&f638hg#S"', '8103436831', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Steffane Gunner', 'sgunnert@google.de', 'oN9#o=7D=G(fkZl8', '7888634404', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Haskel Josskovitz', 'hjosskovitzu@amazon.co.uk', 'pJ1,M0k5$vofD#i`', '9546496484', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Ravid Tulley', 'rtulleyv@buzzfeed.com', 'hM7,nij,"#m}DZ\', '7227587350', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Sheilah Callaghan', 'scallaghanw@mail.ru', 'bH5_h0jI''g', '7676192381', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Aube Oldacre', 'aoldacrex@sakura.ne.jp', 'oL5''{U??R&$z', '8689832543', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Aldridge Gepp', 'ageppy@fastcompany.com', 'jG0}fzDqfAO@', '5787889173', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Carmita Colleton', 'ccolletonz@microsoft.com', 'uG2\7uPO!6''L''jx', '9381499993', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Suzette Jodkowski', 'sjodkowski10@netvibes.com', 'mC3,qhg?a{Dzw', '4559914638', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Maurise Everard', 'meverard11@abc.net.au', 'eT2<I7XV#Cc>e~', '4998413237', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Virgie Marrett', 'vmarrett12@addtoany.com', 'uP0>V`~x*Z(!#', '4562932938', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Con Houtby', 'choutby13@dagondesign.com', 'bQ7{/XlYx', '3035548280', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('El Huckfield', 'ehuckfield14@weather.com', 'hW9`!~QPHN+', '8244797379', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Ardis Monkman', 'amonkman15@wix.com', 'eP9*"}6.J', '1118043065', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Evangelia Eisold', 'eeisold16@disqus.com', 'hM6%S6H3~<', '7834318116', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Jerrie Cloake', 'jcloake17@miibeian.gov.cn', 'oJ5@2Og`|v', '1298013135', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Rory Retchford', 'rretchford18@bloomberg.com', 'jI3_''5i$B?', '1463630373', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Dulce Gatward', 'dgatward19@usgs.gov', 'cY3)ld}!g~ih', '5032740461', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Tuesday Basterfield', 'tbasterfield1a@arizona.edu', 'vV7>gm59YP3', '6872529365', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Claudine Scholer', 'cscholer1b@cloudflare.com', 'bX6*`,&WBno?', '3619109136', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Josy Wyrall', 'jwyrall1c@apache.org', 'kM4"J3RE"=X5On', '1573241725', 'client');
insert into lyfter_ecommerce_pets.users (name, email, password, phone_number, rol) values ('Harwilll Gorwood', 'hgorwood1d@shareasale.com', 'oD0E{V3''D', '1488914457', 'client');