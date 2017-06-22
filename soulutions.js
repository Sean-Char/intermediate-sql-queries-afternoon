-------------------------practice joins-----------------------------

1. Get all invoices where the `UnitPrice` on the `InvoiceLine` is greater than $0.99.

select *
from Invoice i
join InvoiceLine il
on il.invoiceid = i.invoiceid
where il.unitprice > 0.99;

2. Get the `InvoiceDate`, customer `FirstName` and `LastName`, and `Total` from all invoices.

select i.invoiceDate, c.FirstName, c.LastName, i.Total
from invoice i
join customer c
	on i.invoiceId = c.customerId

3. Get the customer `FirstName` and `LastName` and the support reps `FirstName` and `LastName` from all customers.
    * Support reps are on the Employee table.

    select c.FirstName, c.LastName, e.FirstName, e.LastName
    from customer c
    join employee e
    	on e.employeeId = c.supportRepId


4. Get the album `Title` and the artist `Name` from all albums.


select al.title, ar.name
from album al
join artist ar
	on al.artistId = ar.artistId


5. Get all Playlist Tracks where the playlist `Name` is Music.

select pt.TrackId
from PlaylistTrack pt
join Playlist p
	on p.Name = "Music";


6. Get all Track `Name`s for `PlaylistId` 5.

select t.name, pt.PlaylistId
from track t
join playlisttrack pt
	on t.trackId = pt.trackId
where playlistId = 5

7. Get all Track `Name`s and the playlist `Name` that theyre on ( 2 joins ).

select t.name, p.Name
from Track t
join PlaylistTrack pt
	on t.TrackId = pt.TrackId
join Playlist p
	on pt.PlaylistId = p.PlaylistId;

8. Get all Track `Name`s and Album `Title`s that are `"Alternative"` ( 2 joins ).

select t.name, a.title
from track t
join album a
	on a.albumId = t.albumId
join genre g
	on g.name = "Alternative";




--------------Practice nested queries-------------------------

1. Get all invoices where the UnitPrice on the InvoiceLine is greater than $0.99.

select *
from Invoice
where InvoiceId
in (select InvoiceId
    from InvoiceLine
    where UnitPrice > 0.99);

2. Get all Playlist Tracks where the playlist name is Music.

select *
from PlaylistTrack
where PlaylistId =
 (select PlaylistId
  from Playlist
  where Name = "Music");

3. Get all Track names for PlaylistId 5.

select name
from track
where trackId in
 (select trackId
  from PlaylistTrack
  where playlistId = 5);

4. Get all tracks where the Genre is Comedy.

select *
from track
where genreId in
(select genreId
 from genre
 where name = "Comedy");

5. Get all tracks where the Album is Fireball.

select *
from track
where albumId in
	(select albumId
     from album
     where title = "Fireball");

6. Get all tracks for the artist Queen ( 2 nested subqueries ).

select *
from track
where albumId in
	(select albumId
     from album
     where artistId in
     	(select artistId
         from artist
         where name = "Queen"));



---------------------Updating rows------------------------


1. Find all customers with fax numbers and set those numbers to null.


update customer
set fax = null
where fax = is not null


2. Find all customers with no company (null) and set their company to "Self".

update customer
set company = "Self"
where company is null;

3. Find the customer Julia Barnett and change her last name to Thompson.

update customer
set LastName = "Thompson"
where FirstName = "Julia" and LastName = "Barnett"

4. Find the customer with this email luisrojas@yahoo.cl and change his support rep to 4.

update customer
set supportRepid = 4
where email = "luisrojas@yahoo.cl"

5. Find all tracks that are the genre Metal and have no composer. Set the composer to "The darkness around us".

update track
set composer = "The darkness around us"
where genreId = (select genreId
                 from genre
                 where name = "Metal")
      and composer is null

--------------------group by-------------------------------------
1. Find a count of how many tracks there are per genre.


select count(*), g.name
from track t
join genre g
	on t.genreId = g.genreId
order by g.name


2. Find a count of how many tracks are the "Pop" genre.

select count(*), g.name
from track t
join genre g
	on g.name = "Pop"
group by g.name

3. Find a list of all artists and how many albums they have.

select count(*), art.name
from artist art
join album alb
	on art.artistId = alb.artistId
group by alb.albumId


-----------------------use distinct-------------------------------

1. From the Track table find a unique list of all Composers.

select distinct composer
from track

2. From the Invoice table find a unique list of all BillingPostalCodes.

select distinct billingpostalcode
from invoice

3. From the Customer table find a unique list of all Companys.

select distinct company
from customer

----------------------- delete rows-------------------------


1. Delete all "bronze" entries from the table.

delete from practice_delete
where type = "bronze"

2. Delete all "silver" entries from the table.

delete from practice_delete
where type = "silver"

3. Delete all entries whose value is equal to 150.

delete from practice_delete
where value = 150

------------------------- ecommerce Simulation -------------------------

create table Users (
  UserId integer primary key autoincrement,
  Name nvarchar(25),
  Email nvarchar(25)
  );

create table Products (
  ProductId integer primary key autoincrement,
  Name nvarchar(25),
  Price numeric(10,2)
  );

create table Orders (
  OrderId integer primary key autoincrement,
  UserId integer,
  ProductId integer,
  Foreign key (UserId) references Users (UserId)
  Foreign key (ProductId) references Products (ProductId)
  );

---------------------------------------------------------
  insert into Users (Name, Email) values
  ("George Washington", "gw@whitehouse.gov"),
  ("Abe Lincoln", "abe@noLies.gov"),
  ("Barack Obama", "bo@weMissU.gov");

  insert into Products (Name, Price) values
  ("Fidget Spinner", 5.20),
  ("Iphone 7 Case", 10.45),
  ("I'm w/ Stupid T-shirt", 9.99);

  insert into Orders (UserId, ProductId) values
  (3, 1),
  (2, 2),
  (1, 3);
