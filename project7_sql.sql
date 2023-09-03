create database `fullStack7`;
use `fullStack7`;

-- Table: users
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255)
);


-- Table: products
CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255),
  category VARCHAR(255),
  price DECIMAL(10, 2),
  url VARCHAR(500),
  inventory INT
);

-- Table: managers
CREATE TABLE managers (
  manager_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

-- Table: orders
CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  order_date DATETIME,
  total_amount DECIMAL(10, 2),
  status varchar(10),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table: order_items
CREATE TABLE order_items (
  order_item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT,
  unit_price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE icons (
  icon_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  url_befor VARCHAR(255),
  url_after VARCHAR(255)
);

INSERT INTO icons (name, url_befor,url_after)
VALUES ('Dairy', 'https://www.rami-levy.co.il/images/menu/blue-icons/50.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/50.svg');
INSERT INTO icons (name, url_befor,url_after)
VALUES ('meat and fish', 'https://www.rami-levy.co.il/images/menu/blue-icons/51.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/51.svg');
INSERT INTO icons (name, url_befor,url_after)
VALUES ('Fruits and Vegetables', 'https://www.rami-levy.co.il/images/menu/blue-icons/49.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/49.svg');
INSERT INTO icons (name, url_befor,url_after)
VALUES ('Frozen', 'https://www.rami-levy.co.il/images/menu/hover-icons/53.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/53.svg');
INSERT INTO icons (name, url_befor,url_after)
VALUES ('Baking', 'https://www.rami-levy.co.il/images/menu/blue-icons/54.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/54.svg');
INSERT INTO icons (name, url_befor,url_after)
VALUES ('legumes and grains', 'https://www.rami-levy.co.il/images/menu/blue-icons/55.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/55.svg');
INSERT INTO icons (name, url_befor,url_after)
VALUES ('sweets and drinks', 'https://www.rami-levy.co.il/images/menu/blue-icons/56.svg', 'https://www.rami-levy.co.il/images/menu/hover-icons/56.svg');

-- insert to users
INSERT INTO users (name, password, email, phone, address)
VALUES ('Maayan Zohar', '1998', 'maayan659@gmail.com', '0528928564', 'Segara 2 Lod');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Renana Fridman', '1234', 'renana12ema@gmail.com', '0584979024', 'Neva Ofra 8 Alon Mora');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Yael Cohen', '5678', 'yael@gmail.com', '0501234567', 'Hsalom 123, Tel Aviv');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Eitan Levy', '8276', 'eitan@gmail.com', '0529876543', 'Gfan 456, Haifa');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Maya Ben-David', '5678', 'maya@gmail.com', '0543217890', 'David 789, Jerusalem');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Yoni Cohen', 'password4', 'yoni@gmail.com', '0512345678', 'Main Street 12, Raanana');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Noa Levi', 'password5', 'noa@gmail.com', '0523456789', 'Oxford Road 34, Herzliya');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Itamar Avraham', 'password6', 'itamar@gmail.com', '0523456789', 'Rue de la Paix 56, Tel Aviv');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Adi Cohen', 'password7', 'adi@gmail.com', '0523456789', 'Alexanderplatz 78, Haifa');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Liora Golan', 'password8', 'liora@gmail.com', '0523456789', 'Gran Via 90, Jerusalem');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Matan Cohen', 'password9', 'matan@gmail.com', '0523456789', 'Princes Street 10, Raanana');
INSERT INTO users (name, password, email, phone, address)
VALUES ('Shira Levi', 'password10', 'shira@gmail.com', '0523456789', 'Rua Augusta 11, Herzliya');

-- insert to products
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Milk 3%', 'Dairy', 4.99, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/AAL20_Z_P_4131074_1.png', 100);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('White Cheese', 'Dairy', 4.99, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/RKZ26_Z_P_2824640_1.png', 50);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Yogurt', 'Dairy', 3.49, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290005839078/small.jpg', 80);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Yellow cheese', 'Dairy', 10.50, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/MZV18_Z_P_4122270_1.png', 60);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Danone Bio', 'Dairy', 16.90, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290005839078/small.jpg', 70);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Daniela', 'Dairy', 6.49, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/DBN26_Z_P_5838002_1.png', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Bulgarian cheese', 'Dairy', 15.99, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/KOX20_Z_P_4120634_1.png', 30);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Ricotta cheese', 'Dairy', 20.79, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/IMM14_Z_P_2133131_1.png', 90);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Milky', 'Dairy', 3.80, 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_zoom/ZMW36_Z_P_72940761_1.png', 50);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Aktimal', 'Dairy', 29.90, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290006664051/small.jpg', 60);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Ice Coffee', 'Dairy', 9.90, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290003029907/small.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Chocolate Milk', 'Dairy', 9.90, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290003029181/small.jpg', 80);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Mocha', 'Dairy', 9.90, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290003029532/small.jpg', 30);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Piraeus Bulgarian 16%', 'Dairy', 17.80, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290004120573/small.jpg', 50);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Piraeus Bulgarian 24%', 'Dairy', 17.80, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290004120566/small.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Piraeus Bulgarian 5%', 'Dairy', 17.80, 'hhttps://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290004120634/small.jpg', 60);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Bulgarian Gad 24%', 'Dairy', 26.1, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290017065236/small.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Bulgarian Gad 5%', 'Dairy', 26.1, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/7290011499327/small.jpg', 50);


INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Goat Cheese', 'Dairy', 4.99, 'https://example.com/goat_cheese.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Mascarpone Cheese', 'Dairy', 5.49, 'https://example.com/mascarpone_cheese.jpg', 30);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Almond Milk', 'Dairy', 3.49, 'https://example.com/almond_milk.jpg', 60);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Condensed Milk', 'Dairy', 2.99, 'https://example.com/condensed_milk.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Evaporated Milk', 'Dairy', 2.99, 'https://example.com/evaporated_milk.jpg', 50);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Soy Milk', 'Dairy', 2.99, 'https://example.com/soy_milk.jpg', 60);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Hazelnut Milk', 'Dairy', 3.99, 'https://example.com/hazelnut_milk.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Cashew Milk', 'Dairy', 3.99, 'https://example.com/cashew_milk.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Coconut Milk', 'Dairy', 2.99, 'https://example.com/coconut_milk.jpg', 50);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Rice Milk', 'Dairy', 2.99, 'https://example.com/rice_milk.jpg', 50);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Quark Cheese', 'Dairy', 3.99, 'https://example.com/quark_cheese.jpg', 40);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Sheep Milk', 'Dairy', 4.99, 'https://example.com/sheep_milk.jpg', 30);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Lactose-Free Milk', 'Dairy', 3.49, 'https://example.com/lactose_free_milk.jpg', 50);


INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Apple', 'Fruits and Vegetables', 12.9, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/797/45399/medium.jpg', 200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Banana', 'Fruits and Vegetables', 3.2, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/134/35/medium.jpg', 150);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Orange', 'Fruits and Vegetables', 5.9, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/122/24/medium.jpg', 180);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Tamar', 'Fruits and Vegetables', 2.49, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290018208502/405532/medium.jpg', 100);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Watermelon', 'Fruits and Vegetables', 2.9, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/169/6346/medium.jpg', 80);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Grapes', 'Fruits and Vegetables', 15.99, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/185/65/medium.jpg', 120);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('pear', 'Fruits and Vegetables', 9.79, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/113/15/medium.jpg', 250);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('kawaii', 'Fruits and Vegetables', 12.89, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/120/22/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('tomato', 'Fruits and Vegetables', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/100/2/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('cucumber', 'Fruits and Vegetables', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/101/3/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Red pepper', 'Fruits and Vegetables', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/104/6/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Green pepper', 'Fruits and Vegetables', 8.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/103/5/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Yellow pepper', 'Fruits and Vegetables', 8.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/168/61/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('lemon', 'Fruits and Vegetables', 6.89, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/117/19/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('white onion', 'Fruits and Vegetables', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/108/10/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('purple Onion', 'Fruits and Vegetables', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/289/78/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('eggplant', 'Fruits and Vegetables', 7.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/106/8/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Squash', 'Fruits and Vegetables', 7.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/107/9/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('White cabbage', 'Fruits and Vegetables', 2.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/109/11/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Salmon', 'Meat and fish', 74.9, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/8202367/372546/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Red tuna', 'Meat and fish', 61.00, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/2281429/352015/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Striped bass', 'Meat and fish', 47.10, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/2830184/261719/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Asado', 'Meat and fish', 51.00, 'https://www.rami-levy.co.il/_ipx/w_366,f_webp/https://img.rami-levy.co.il/product/1004333/390757/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Entrecote', 'Meat and fish', 64.90, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/4034658/344537/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Mince', 'Meat and fish', 50.80, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002105749/280131/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Chicken Breast', 'Meat and fish', 25.20, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/2680369/349598/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Thin schnitzel', 'Meat and fish', 35.70, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/2680604/349641/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Sausage', 'Meat and fish', 8.00, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002827306/280133/medium.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('hamburger', 'Meat and fish', 26.90, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290004034610/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Jehanon', 'Frozen', 13.60, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002327028/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Potato cigars', 'Frozen', 9.90, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002603962/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Falafel', 'Frozen', 18.90, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290008343626/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Borax Potatoes', 'Frozen', 17.20, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290006741363/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Borax Pizza', 'Frozen', 21.60, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290010760909/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Pizza', 'Frozen', 12.90, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002603979/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Sweet potato chips', 'Frozen', 17.70, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002026358/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Onion rings', 'Frozen', 18.90, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290000334684/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Chips', 'Frozen', 26.40, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290014459373/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Minced garlic', 'Frozen', 10.00, 'https://www.rami-levy.co.il/_ipx/w_155,f_webp/https://img.rami-levy.co.il/product/7290002253105/small.jpg', 220);

INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Cocoa', 'Baking', 13.50, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290018711316/small.jpg', 150);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Date spread', 'Baking', 4.80, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290011154189/small.jpg', 230);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Strawberry jelly', 'Baking', 3.70, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290022005319/small.jpg', 110);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Lemon jelly', 'Baking', 3.70, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290022005326/small.jpg', 200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Maple syrup', 'Baking', 10.70, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290008102087/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Chocolate syrup', 'Baking', 10.70, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290008102094/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Instant vanilla pudding', 'Baking', 3.80, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290000068138/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Instant chocolate pudding', 'Baking', 3.80, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290112966841/small.jpg', 180);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Baking powder', 'Baking', 1.90, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290018710234/small.jpg', 220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Vanilla sugar', 'Baking', 1.90, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290018710241/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Sugar powder', 'Baking', 1.90, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290018710319/small.jpg', 170);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Drinking soda', 'Baking', 1.60, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290010004744/small.jpg', 130);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Colored candies', 'Baking', 8.00, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290011065225/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Blue food coloring', 'Baking', 3.50, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290011065157/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Green food coloring', 'Baking', 3.50, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290011065140/small.jpg',150);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Yellow food coloring', 'Baking', 3.50, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290011065164/small.jpg',170);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Ground coconut', 'Baking', 13.50, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290018710302/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Cornflour', 'Baking', 4.00, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290002319375/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Sesame', 'Baking', 6.10, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290018710272/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Chocolate chips', 'Baking', 0, 'https://www.rami-levy.co.il/_ipx/w_320,f_webp/https://img.rami-levy.co.il/product/7290011065188/small.jpg',200);

INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Star flakes', 'Legumes and Grains', 5.10, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060576/small.jpg',150);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Couscous flakes', 'Legumes and Grains', 5.10, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060200/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Thin noodles', 'Legumes and Grains', 4.80, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060972/small.jpg',270);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Noodles', 'Legumes and Grains', 9.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000313290/small.jpg',150);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Spaghetti pasta', 'Legumes and Grains', 5.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060880/small.jpg',170);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Curled pasta', 'Legumes and Grains', 5.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060781/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Shellfish pasta', 'Legumes and Grains', 5.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060842/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Tubes pasta', 'Legumes and Grains', 5.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290107871990/small.jpg',220);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Lasagna', 'Legumes and Grains', 10.0, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060415/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Couscous', 'Legumes and Grains', 4.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290006653819/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Rice for sushi', 'Legumes and Grains', 12.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290100701157/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Persian rice', 'Legumes and Grains', 10.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000211442/small.jpg',180);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Bulgur', 'Legumes and Grains', 3.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290016865875/small.jpg',170);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Quinoa', 'Legumes and Grains', 9.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290016865899/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Red lentils', 'Legumes and Grains', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290016865820/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Green lentils', 'Legumes and Grains', 5.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290016865837/small.jpg',260);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Huge hummus', 'Legumes and Grains', 8.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290016865813/small.jpg',210);

INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Beesley onion', 'Sweets and Drinks', 7.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290115201727/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Beasley BBQ', 'Sweets and Drinks', 7.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290115201703/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Beasley Grill', 'Sweets and Drinks', 7.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000066196/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Kipli', 'Sweets and Drinks', 4.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000110844/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Red bamba', 'Sweets and Drinks', 8.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290112966445/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Bamba Nougat', 'Sweets and Drinks',  8.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290100687109/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Classic bamba', 'Sweets and Drinks',  8.00, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000066318/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Bagel', 'Sweets and Drinks', 8.10, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000060088/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Potato chips', 'Sweets and Drinks', 4.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290000178707/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Kinder Bueno White', 'Sweets and Drinks', 10.0, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/8000500121436/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Kinder come on brown', 'Sweets and Drinks', 10.0, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/8000500029350/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('White click', 'Sweets and Drinks', 4.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290116530109/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Click Nougat', 'Sweets and Drinks', 4.50, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290116532011/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Tummy', 'Sweets and Drinks', 3.10, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/72917367/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Mango Spring', 'Sweets and Drinks', 6.20, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290001247099/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Banana spring', 'Sweets and Drinks', 6.20, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290016006292/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Spring Pomegranate', 'Sweets and Drinks', 6.20, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290008757980/small.jpg',210);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Peach flavored water', 'Sweets and Drinks', 7.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290110114794/small.jpg',200);
INSERT INTO products (product_name, category, price, url, inventory)
VALUES ('Grape flavored water', 'Sweets and Drinks', 7.90, 'https://www.rami-levy.co.il/_ipx/w_280,f_webp/https://img.rami-levy.co.il/product/7290110114800/small.jpg',180);
