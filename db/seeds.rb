# Seeding user_types
# admin = UserType.create!(user_type: 'Admin')
# customer = UserType.create!(user_type: 'Customer')

# # Seeding users
# user1 = User.create!(name: 'John Doe', email: 'john@example.com', password: 'password', user_type_id: admin.id)
# user2 = User.create!(name: 'Jane Doe', email: 'jane@example.com', password: 'password', user_type_id: customer.id)

# Seeding companies
# company = Company.create(name: 'Costa Cat', description: 'Our COSTA CAT I is a luxury, 55 foot, fully air-conditioned catamaran. The COSTA CAT II, our newest addition, is a 39 foot, open-air catamaran. Both luxury catamarans cruise from the world class Los Sueños Resort & Marina.', address: 'Los Sueños Marina, Herradura, Costa Rica', contact_info: 'www.costacat.com')

company2 = Company.create(name: 'Capsule Corp', description: 'a super futuristic corporation', address: 'West Capital', contact_info: 'www.capsule-corp.com')
company3= Company.create(name: 'ACME', description: 'world famous industry', address: 'Looney toons', contact_info: 'www.acme.com')
company4 = Company.create(name: 'Stark industries', description: 'Worlds best defense industry', address: 'New York', contact_info: 'www.starkinc.com')
company5 = Company.create(name: 'Wayne Enterprise', description: 'The best company in DC Comics ', address: 'Gotham City', contact_info: 'www.wayneenterprise.com')
company6 = Company.create(name: 'Duff', description: 'Worlds largest beer company', address: 'Springfield', contact_info: 'www.duff.com')
company7 = Company.create(name: 'Oscorp', description: 'Leading biotech company', address: 'New York', contact_info: 'www.oscorp.com')
company8 = Company.create(name: 'Umbrella Corporation', description: 'Secret Farmaceutic Empire', address: 'Racoon City', contact_info: 'www.umbrella-corp.com')
company9 = Company.create(name: 'Wonka', description: 'Worlds largest chocolate company', address: 'Colorado', contact_info: 'www.wonka.com')



# Seeding tours
tour1 = Tour.create(name: 'Tour to Namekusein', description: 'visit namekusein with us, with the fastest ships', duration: '2 days', price: 1000 , availability: true, company_id:2)

tour2 = Tour.create(name: 'Tour to Kamisamas house', description: 'visit the sanctuary of kamisama and train y the time chamber', duration: '10 hours', price: 200 , availability: true, company_id:2)

tour3 = Tour.create(name: 'Tour to Looney Toons world', description: 'visit Toon Land where Michael Jordan an Lebron James had played bascketball', duration: '8 hours', price: 300 , availability: true, company_id:3)

tour4 = Tour.create(name: 'Tour to new Asgard', description: 'lets go visit where the asgardians live, meet thor and valkyrie', duration: '12 hours', price: 750 , availability: true, company_id:4)

tour5 = Tour.create(name: 'Tour to Avengers Tower', description: 'visit the tower where the avengers are', duration: '6 hours', price:500 , availability: true, company_id:4)

tour6 = Tour.create(name: 'Tour to Arkham asylum', description: 'visit where the most lunatic criminals of gotham city are ', duration: '5 hours', price: 400 , availability: true, company_id:5)

tour7 = Tour.create(name: 'Tour to Wayne Mansion', description: 'come and visit the mansion where Bruce Wayne lives', duration: '5 hours', price: 250 , availability: true, company_id:5)

tour8 = Tour.create(name: 'Tour to the Batcave', description: 'visit the cave where batman operates', duration: '4 hours', price:375 , availability: true, company_id:5)

tour9 = Tour.create(name: 'Tour to Springfield', description: 'lets go and visit springfield', duration: '4 hours', price: 280 , availability: true, company_id:6)

tour10 = Tour.create(name: 'Tour to Duff Factory', description: 'visit the largest beer factory in Springfield', duration: '3 hours', price:150 , availability: true, company_id:6)

tour11= Tour.create(name: 'Tour to the Simpsons House', description: 'lets visit the house of the famous Simpson', duration: '2 hours', price: 200 , availability: true, company_id:6)

tour12= Tour.create(name: 'Tour to Oscorp', description: 'visit the oscorp tower and see all of the technolgy they have', duration: '5 hours', price: 400 , availability: true, company_id:7)

tour13= Tour.create(name: 'Tour to Peter Parker house', description: 'visit where Peter Parker grew up', duration: '2 hours', price: 100 , availability: true, company_id:7)

tour14= Tour.create(name: 'Tour to the Empire state', description: 'get on top of the empire state with spiderman', duration: '1 hour', price: 600 , availability: true, company_id:7)

tour15= Tour.create(name: 'Tour to Umbrella Corp tower', description: 'visit the most highly advanced tower in the world', duration: '4 hours', price: 500 , availability: true, company_id:8)

tour16= Tour.create(name: 'Tour to Umbrella corp underground secret facility', description: 'visit the underground secret facility in the desert of las vegas', duration: '6 hours', price: 700 , availability: true, company_id:8)

tour17= Tour.create(name: 'Tour to Zombie zoo', description: 'come and see our failed  experiments', duration: '2 hours', price: 650 , availability: true, company_id:8)

tour18= Tour.create(name: 'Tour to Racoon City', description: 'come and visit Racoon city, home of S.T.A.R.S', duration: '4 hours', price: 350 , availability: true, company_id:8)

tour19= Tour.create(name: 'Tour to Nemesis museum', description: 'visit our museum and see Nemesis body', duration: '2 hours', price: 400 , availability: true, company_id:8)

tour20= Tour.create(name: 'Tour to Willy Wonkas Chocolate Factory', description: 'Lets go and visit the worlds largest chocolate factory', duration: '7 hours', price: 800 , availability: true, company_id:9)


# Seeding payment_methods
# payment_method1 = PaymentMethod.create(payment_type: 'Credit Card')
# payment_method2 = PaymentMethod.create(payment_type: 'Cash')
# payment_method2 = PaymentMethod.create(payment_type: 'Paypal')


# Seeding bookings
# booking = Booking.create(booking_date: Date.today, user_id: 2, tour_id: 1, payment_method_id: 1)

# Seeding comments
# comment = Comment.create(comment_text: 'Great tour! it was awsome and the crew and captain were the best', rating: 10, user_id: 2, tour_id: 1)

