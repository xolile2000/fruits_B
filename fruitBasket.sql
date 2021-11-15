create table fruit_basket(
    id serial not null primary key,
    fruit text not null,
    qty int not null,
    price money not null
);
insert into fruit_basket(fruit,qty,price) values ('apple',40,30);
insert into fruit_basket(fruit,qty,price) values ('banana',95,70);
insert into fruit_basket(fruit,qty,price) values ('peach',90,60);