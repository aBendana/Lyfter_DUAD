SET search_path TO lyfter_car_rental;

DROP TYPE IF EXISTS account_status;
CREATE TYPE account_status AS ENUM ('active', 'inactive', 'suspended', 'blocked');

CREATE TABLE lyfter_car_rental.users
(
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name character varying(35) NOT NULL,
    email character varying(35) UNIQUE NOT NULL,
    password character varying(20) NOT NULL,
    birth_date date NOT NULL,
    status account_status NOT NULL DEFAULT 'active'
);


INSERT INTO lyfter_car_rental.users (user_name, email, password, birth_date) VALUES
('Hestia Bradburne', 'hbradburne0@histats.com', 'aQ7@?&=zUh,@', '1997-06-10'),
('Mort Caisley', 'mcaisley1@vinaora.com', 'wD8?Xh9GYK<', '1943-08-27'),
('Galven Lewington', 'glewington2@scribd.com', 'qT2>IGQ/', '1989-03-27'),
('Dionysus Qualtro', 'dqualtro3@answers.com', 'vS9~M@JhLk/&l2', '1990-01-26'),
('Karlee Bailles', 'kbailles4@theglobeandmail.com', 'wJ7,P"Q%sl#', '1966-11-10'),
('Theodora Alessandrucci', 'talessandrucci5@indiatimes.com', 'hA9~Wab>Ii8X>', '1920-04-21'),
('Trudy Balshaw', 'tbalshaw6@sina.com.cn', 'jG8?iA=Ifw{', '1964-12-17'),
('Scarlet Askell', 'saskell7@networksolutions.com', 'eI5>''rkP<', '1981-08-01'),
('Sharla Cafferty', 'scafferty8@ning.com', 'dU5}q3nG!.sp&6s<', '1929-11-22'),
('Clifford Seymour', 'cseymour9@cnet.com', 'oY1@LVc.e0voI', '1963-05-02'),
('Milty Wainscot', 'mwainscota@economist.com', 'eX5@/Y|4fW', '1975-08-06'),
('Marlo Harlowe', 'mharloweb@slashdot.org', 'oP6''2r8w&FF_', '1980-06-28'),
('Karena Langstrath', 'klangstrathc@domainmarket.com', 'eO6%I({+c*J', '1987-12-28'),
('Bevin Pryde', 'bpryded@aol.com', 'pW5}?qPJA,IS', '1946-07-26'),
('Emmit Shewan', 'eshewane@purevolume.com', 'aH7%9gkb7K', '1994-01-25'),
('Horacio Peel', 'hpeelf@bigcartel.com', 'gV5,N_&yI', '2004-04-19'),
('Meggi Braidford', 'mbraidfordg@loc.gov', 'iM6.C3wO<', '1938-03-25'),
('Lay Buckthorpe', 'lbuckthorpeh@goodreads.com', 'xB8.c@C0K?w6T,', '1981-11-25'),
('Sigmund Donwell', 'sdonwelli@imageshack.us', 'vC8`nk3N__&', '1920-05-28'),
('Rasia Brecken', 'rbreckenj@flickr.com', 'tA7''/yUI', '1934-09-16'),
('Jere Fathers', 'jfathersk@imdb.com', 'oC2(.6ebf?', '1969-08-09'),
('Kali Rostern', 'krosternl@fda.gov', 'lR2<nU\w''UAs#it)', '1920-12-31'),
('Joel Roncelli', 'jroncellim@facebook.com', 'iP3!5R`{6SJ', '1953-07-19'),
('Eddy Merrikin', 'emerrikinn@addtoany.com', 'lW4~h4<5wQ{gDn', '2000-05-26'),
('Consolata Leddy', 'cleddyo@biglobe.ne.jp', 'uQ2}1@J5ZxxJ}', '1966-01-28'),
('Dredi Abbatt', 'dabbattp@technorati.com', 'sQ8&Ny`m{', '1999-03-26'),
('Ambrosius Ruby', 'arubyq@aboutads.info', 'xQ8''z>W{', '1933-02-27'),
('Carmela Coultous', 'ccoultousr@ihg.com', 'zF0~(E`~j(4t', '1956-12-13'),
('Budd Hovee', 'bhovees@europa.eu', 'yQ2{d6WC{>#', '1935-05-23'),
('Che Errington', 'cerringtont@barnesandnoble.com', 'oA1+YX}Zh"', '1984-08-30'),
('Enrika Van Niekerk', 'evanu@digg.com', 'fE8<\I0h{/&~aL', '1941-04-14'),
('Cecile Abden', 'cabdenv@npr.org', 'xS4~/T<_G~''9pF', '1961-08-24'),
('Danna Verheyden', 'dverheydenw@noaa.gov', 'cR5,"9?228j!J.', '1932-07-31'),
('Ignaz Sturzaker', 'isturzakerx@trellian.com', 'kZ7*R\B//Ni=#e/', '1971-10-08'),
('Justinian Hauger', 'jhaugery@spotify.com', 'rK3)Zx/~!7O8', '1923-08-11'),
('Mireille Dudley', 'mdudleyz@usa.gov', 'uU4}xo,o(dhz', '1941-10-18'),
('Stanfield Cantillon', 'scantillon10@youku.com', 'aE3,Z9G_', '1939-02-27'),
('Marjorie Bathow', 'mbathow11@cisco.com', 'gP8$5Ncd\B`aAJ6S', '1988-10-19'),
('Urson Jacquest', 'ujacquest12@rediff.com', 'hN0&7)9Ki!I#s', '1997-04-21'),
('Alaster Ferrucci', 'aferrucci13@skyrock.com', 'pA0<YER`VZSrru', '1923-10-21'),
('Penn Crysell', 'pcrysell14@samsung.com', 'fN6`8xP8(Lm''XAW', '1991-06-30'),
('Udall Stappard', 'ustappard15@theglobeandmail.com', 'qG8<M>IKTj', '1945-12-30'),
('Faydra Larne', 'flarne16@google.ca', 'xT2_g4q2D*"N', '1969-04-14'),
('Jarrad Zamudio', 'jzamudio17@nydailynews.com', 'yI4}*$MNv01tyfa''', '1922-08-23'),
('Tandy Stonehouse', 'tstonehouse18@hp.com', 'hM6&~d\4h{t8VNlc', '1952-08-13'),
('Murry Bodicam', 'mbodicam19@soup.io', 'cB0}Z.H$#J<#z%N', '1975-02-12'),
('Diann Bernardelli', 'dbernardelli1a@imdb.com', 'cF8)2y0uPWN`F3(i', '1920-11-25'),
('Shelby Emmanuele', 'semmanuele1b@ucla.edu', 'xS2&WN\?!B+dSkiK', '1936-06-15'),
('Zaccaria Frodsham', 'zfrodsham1c@auda.org.au', 'sT8{XBX7O"', '1943-12-05'),
('Angelique Brotherick', 'abrotherick1d@fotki.com', 'aO4!y_tCI', '1996-02-17');