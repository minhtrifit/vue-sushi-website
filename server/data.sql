--
-- PostgreSQL database dump
--

\restrict 2aKnDWckC2Vb1c8ibaTmOHN5T2ZyYwYesb3HB0vgjwqbRgJ0mddlm2UZSmIFdoR

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Category" (id, name, "imageUrl", "isActive", "createdAt", "updatedAt") FROM stdin;
e666eea4-b62b-454e-a633-0fb43e44457a	Ramen	http://localhost:5000/uploads/1773377989653-65223572.png	t	2026-03-13 04:59:50.963	2026-03-13 08:39:39.65
a3c06ee1-176c-4731-9391-ca6195c34706	Udon	http://localhost:5000/uploads/1773387265764-709182841.png	t	2026-03-13 04:32:08.362	2026-03-13 08:43:25.889
d5dc34ad-b5de-48c0-8113-b7f3d76eb7b5	Other	http://localhost:5000/uploads/1773391447319-650240780.png	t	2026-03-13 04:30:10.875	2026-03-13 08:44:09.484
ed3a04ad-6510-481d-a1c9-1dde01ff50ba	Nigiri	http://localhost:5000/uploads/1773391457399-844230508.png	t	2026-03-13 08:44:27.863	2026-03-13 08:44:27.863
d10b49fb-04e3-4253-87af-3828e059efa0	Sushi	http://localhost:5000/uploads/1773391482242-73455623.png	t	2026-03-13 08:44:43.205	2026-03-16 02:20:56.188
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Contact" (id, email, "createdAt") FROM stdin;
d94be660-dba0-4cfb-af5b-34a07d3f89bd	trilm@techhaus.vn	2026-03-11 02:46:32.838
56adaf27-3f57-4535-94a2-8ec018e1b71c	test@gmail.com	2026-03-11 02:47:35.347
6bcc97dc-d541-40b1-86a4-bf55923e9644	test@gmail.com	2026-03-11 02:49:28.618
dc7e3dd3-f9eb-4c33-b202-7ad41f73746e	john@gmail.com	2026-03-11 02:50:42.297
5933c4b2-b65c-4bbd-bb69-6c9efeb358a3	user2@gmail.com	2026-03-11 02:51:26.939
a949bb42-32b8-4dfe-a568-5e53a474abf6	abc@gmail.com	2026-03-11 03:18:47.762
056ead71-ca9f-40a3-a8de-d7f5e13dbb93	toibingu@gmail.com	2026-03-11 06:05:40.327
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Product" (id, name, sku, price, stock, "imageUrl", description, "isActive", "categoryId", "createdAt", "updatedAt") FROM stdin;
332c62ac-1223-4ec6-837c-ccc038eb3603	Maki	SKU-757A2Q	8.99	100	http://localhost:5000/uploads/1773643606035-673949110.png	Sushi Maki	t	d10b49fb-04e3-4253-87af-3828e059efa0	2026-03-16 06:46:47.587	2026-03-16 06:48:45.424
da6cc080-6c3b-44ab-b7a9-6cf5582508d4	Maki Salmon	SKU-YKNX9N	2.85	100	http://localhost:5000/uploads/1773643760364-829364923.png		t	d10b49fb-04e3-4253-87af-3828e059efa0	2026-03-16 06:49:21.281	2026-03-16 06:49:21.281
7ea25dea-51f9-4bd1-b979-57dcf461b512	Ikura	SKU-CKEC8Z	6.28	100	http://localhost:5000/uploads/1773643780514-296551728.png		t	d10b49fb-04e3-4253-87af-3828e059efa0	2026-03-16 06:49:41.269	2026-03-16 06:49:41.269
f7e970d9-719c-4848-a613-c887930541ae	Dumpling	SKU-1EMT8X	3.45	100	http://localhost:5000/uploads/1773646505426-350892040.png		t	d5dc34ad-b5de-48c0-8113-b7f3d76eb7b5	2026-03-16 07:35:08.192	2026-03-16 07:35:08.192
220bb729-9a4e-41df-a42e-c0a069f0b29c	Onigiri	SKU-ARRGMJ	4.5	100	http://localhost:5000/uploads/1773646529612-28034101.png		t	d5dc34ad-b5de-48c0-8113-b7f3d76eb7b5	2026-03-16 07:35:31.009	2026-03-16 07:35:31.009
422b685f-248b-4ccf-9795-e37b6faa08ca	Sukiyaki	SKU-VBIU97	2.89	100	http://localhost:5000/uploads/1773646552757-918383921.png		t	d5dc34ad-b5de-48c0-8113-b7f3d76eb7b5	2026-03-16 07:35:54.775	2026-03-16 07:35:54.775
11c9a241-ea52-4fb0-bffe-07d501616f4f	Tako Nigiri	SKU-2A25AZ	10.22	100	http://localhost:5000/uploads/1773649290844-732430992.png		t	ed3a04ad-6510-481d-a1c9-1dde01ff50ba	2026-03-16 08:21:31.892	2026-03-16 08:21:31.892
3d2c8723-9a0c-4a13-9067-c3be1f59099a	Amaebi Nigiri	SKU-FZ15NR	7.5	100	http://localhost:5000/uploads/1773649318700-533545682.png		t	ed3a04ad-6510-481d-a1c9-1dde01ff50ba	2026-03-16 08:21:59.604	2026-03-16 08:21:59.604
793c6902-8c6c-4436-b816-11815adb057c	Sake Nigiri	SKU-VWYDPU	8.3	100	http://localhost:5000/uploads/1773649338784-237603672.png		t	ed3a04ad-6510-481d-a1c9-1dde01ff50ba	2026-03-16 08:22:19.77	2026-03-16 08:22:19.77
ec84b332-dd98-4398-b1f5-41cf1989cf2e	Shoyu Ramen	SKU-7VJQX3	8.99	100	http://localhost:5000/uploads/1773649393569-668669954.png		t	e666eea4-b62b-454e-a633-0fb43e44457a	2026-03-16 08:23:14.476	2026-03-16 08:23:14.476
d189c8d1-0d97-49ef-b462-645127d0f359	Tonkotsu Ramen	SKU-NQ4NKY	5.3	100	http://localhost:5000/uploads/1773649419716-103886313.png		t	e666eea4-b62b-454e-a633-0fb43e44457a	2026-03-16 08:23:40.76	2026-03-16 08:23:40.76
5dd442f2-8df1-4086-94fb-a6f0bacf703a	Soja Ramen	SKU-HPM68C	9.2	100	http://localhost:5000/uploads/1773649452674-90667325.png		t	e666eea4-b62b-454e-a633-0fb43e44457a	2026-03-16 08:24:13.761	2026-03-16 08:24:13.761
ac8741e3-3d58-46a6-bbc2-c2d44f6d9080	Kitsune Udon	SKU-CYWPP2	4.8	100	http://localhost:5000/uploads/1773649506157-429330394.png		t	a3c06ee1-176c-4731-9391-ca6195c34706	2026-03-16 08:25:06.937	2026-03-16 08:25:06.937
e2c09f08-c43c-4d1f-abf1-c49759e9def0	Yaki Udon	SKU-UYH7KF	3.5	100	http://localhost:5000/uploads/1773649550164-975357236.png		t	a3c06ee1-176c-4731-9391-ca6195c34706	2026-03-16 08:25:50.956	2026-03-16 08:25:50.956
32b33f77-b880-4c99-8155-d2ef37fa0a7f	Nabemono Udon	SKU-0YW3C1	8.99	100	http://localhost:5000/uploads/1773649644074-39023830.png		t	a3c06ee1-176c-4731-9391-ca6195c34706	2026-03-16 08:27:24.993	2026-03-16 08:27:24.993
\.


--
-- Data for Name: Section; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Section" (id, "mainTitle", "subTitle", content, type, "createdAt", "updatedAt") FROM stdin;
bbc863f3-5a0a-4ac3-b932-27597074a801	Enjoy Delicious\nThe	Japanese Foods	We serve the finest Japanese cuisine. Prepared with carefully selected natural ingredients by a professional chef, guaranteeing a high-quality flavor. We hope you enjoy your meal.	HOME	2026-03-10 08:45:31.035	2026-03-10 14:26:25.893
e446e678-cb34-4747-9e2f-ce61074891de	Our Special Dish	Sashimi Oishi	We serve the best and freshest seafood eaten raw with soy sauce, grated ginger and wasabi, combining the authentic flavor of the Japanese for your palate.	SPECIAL	2026-03-10 08:45:31.052	2026-03-10 14:42:15.194
0513c59f-8fc0-4421-92a1-6ac16df6ab25	We Serve You The\nAuthentic	Japanese\nFlavor	We have been operating for ten years to continue serving Japanese food, with authentic flavors that we will continue to naturalize for you.	ABOUT	2026-03-10 08:45:31.046	2026-03-10 14:15:46.566
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."User" (id, email, password, "fullName", role, "isActive", "createdAt", "updatedAt") FROM stdin;
61bc2926-25e5-4295-98cd-8ce6c30311aa	admin@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Admin	ADMIN	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
9c29fbcb-82c3-438a-8153-6725192c265b	Tyrel.Gibson@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Tyrel Gibson	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
94e75f7c-4df8-47b3-b65c-4d28fe4da1b3	Jaclyn_Spencer@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Jaclyn Spencer	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
2cc10545-48ab-491e-ac09-b7dc350faabe	Belle_Reichert41@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Belle Reichert	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
26fc78e6-9496-4f4b-9620-5b40c5915264	Astrid_Treutel7@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Astrid Treutel	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
344456b9-af29-423d-b64c-a35829a4613c	Aracely_Hilpert10@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Aracely Hilpert	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
035b145a-9da8-408f-a4e3-4b297374e2e2	Andre_Harris5@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Andre Harris	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
8b62c17e-e535-43db-a10d-46a04b34d256	Dexter_Raynor@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Dexter Raynor	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
c5d2ae83-a5aa-4835-8fd9-28e10b1cbce1	Makenzie.Kertzmann@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Makenzie Kertzmann	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
f4ba86d6-ede4-40c4-b84d-0339e9c916a4	Marshall.Howe42@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Marshall Howe	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
f9afa17f-95f5-4d84-8c06-775e67464261	Vicente_Roberts40@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Vicente Roberts	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
822e49c6-51a9-486e-9d78-a36c775b2691	Scottie_Schmitt11@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Scottie Schmitt	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
b0694251-ab91-4d30-b7e1-1fc322064b88	Marilie.Bechtelar@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Marilie Bechtelar	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
a5a0a0ae-fca0-4c27-9af7-5a88e6663134	Vince_Herzog39@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Vince Herzog	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
57e01293-ec58-41a4-b9c1-13171d5d9310	Douglas.Vandervort45@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Douglas Vandervort	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
9811e5b9-9aaa-402a-845a-366058a38f1b	Cale_Conn0@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Cale Conn	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
c7d31930-350c-4cf0-a27e-2883c966957f	Odie.Kuhn78@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Odie Kuhn	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
c21bf527-3812-4fbb-a09b-a7bad8983eff	Wanda_Kuvalis22@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Wanda Kuvalis	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
ae557a55-6807-4262-a626-9e5b058b387b	Orrin.Dach@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Orrin Dach	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
738b7a8b-2e2b-436e-bcc1-477ae4b94829	Aric_Spinka93@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Aric Spinka	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
f0632f06-97ee-4dbd-bc73-8864b539e8a4	Kenton_Graham78@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Kenton Graham	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
050acb4b-ef24-4f34-ad76-6105104b5ee7	Bobbie.Fay@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Bobbie Fay	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
9794dcd2-855e-4bd1-b710-f8a89b783a62	Llewellyn_Cartwright@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Llewellyn Cartwright	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
8f04cfb6-c226-4938-ae38-eb90a3438970	Terrell_Williamson21@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Terrell Williamson	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
541d836a-518e-45ce-952e-716bc757c42a	Aletha.Bruen@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Aletha Bruen	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
6b1ed2aa-c29d-46ec-816c-02959f43b00e	Brittany.Kuhic1@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Brittany Kuhic	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
2c983868-e670-4875-a521-ec7d8b50bf21	Logan.Hoeger@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Logan Hoeger	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
5dd4220d-93ce-46a1-8026-107727b6e4eb	Danielle.MacGyver@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Danielle MacGyver	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
78aeb36a-1b1b-4524-981b-a561abed897f	Donna_Kemmer17@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Donna Kemmer	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
7e6546fc-24fd-4509-abe3-e2447a0c1c6e	Valentin.Conn@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Valentin Conn	USER	f	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
4b49c427-5a4a-47d3-bd03-6c7cca939ba6	Sophie_King@gmail.com	$2b$10$fIc/jDWJT6P6RxwPj0A2NOJXgbeqca05V6TLUTB6s0Fo27h/xsUVu	Sophie King	USER	t	2026-03-10 01:56:19.869	2026-03-10 01:56:19.869
ce33b785-b741-496d-914d-0268bcf8a11e	Bart.Pfeffer@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Bart Pfeffer	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
10ab0d82-dee0-43fd-823d-f5bf8005a46a	Clarissa.Hackett@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Clarissa Hackett	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
eaf90d70-a4be-499b-8054-f469f1686d34	Zella_Goyette@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Zella Goyette	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
863cde2d-ca08-4003-8a82-a4f63327e971	Jordon_Feil@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Jordon Feil	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
53dc28f8-baa0-4cda-b5f3-919c1c09dc8f	Merlin.Ullrich70@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Merlin Ullrich	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
84d65766-7af3-4770-9094-e3c9821fcc7c	Antonio_Hickle@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Antonio Hickle	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
a7b8cc4c-8768-436f-99c7-eaeab1a2dc8a	Madalyn_Becker0@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Madalyn Becker	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
16fb9b06-28dc-47be-8025-d3de6cf3f9fc	Mariah.Kassulke@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Mariah Kassulke	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
56dfd59a-96e9-48a7-8a87-2d08ed0d34fd	Alene.Nikolaus89@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Alene Nikolaus	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
5a1f0314-b5e7-4fc4-b5fc-ec6f9a5d5943	Destiny.Berge@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Destiny Berge	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
89c5ffd5-7f2f-4811-94c8-b01aaf8a134d	Mitchel.Bartell@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Mitchel Bartell	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
e2286a05-c17c-4449-816f-12d22de5834a	Ignatius.Christiansen78@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Ignatius Christiansen	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
121765f7-9b8f-4740-8ac1-19651b316d2d	Meda_Pouros76@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Meda Pouros	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
42b128f9-430c-4356-9011-47eadc222321	Cullen_Runolfsdottir@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Cullen Runolfsdottir	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
e8cc5471-7320-4f0d-8cc5-2046a828bf82	Vinnie_Gottlieb@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Vinnie Gottlieb	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
fe5552db-afda-483e-8915-dd5a7479e147	Aubree_Wisozk@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Aubree Wisozk	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
24a3328f-8242-430c-b9d5-015ee3416eb4	Darien_Wehner@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Darien Wehner	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
cb6a6cb6-b9c4-4748-a9aa-2a8900f5c721	Antonia.Wisozk@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Antonia Wisozk	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
f0b3b117-568b-4de5-ac1b-a5948996a01e	Asha_Langosh@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Asha Langosh	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
152c3a0c-54b7-42f3-a5b2-7a829fee5ab7	Arnaldo.Dibbert@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Arnaldo Dibbert	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
4fccbfd1-a58f-4a0e-96eb-50f81c072ff3	Jarrod.Pfeffer99@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Jarrod Pfeffer	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
870dc3ba-ce67-4480-bff5-0d9ff93b0f45	Leslie_Nienow70@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Leslie Nienow	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
c1e41af5-5c98-4583-8171-2fb2e6b9920c	Oliver.Hilpert@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Oliver Hilpert	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
ba5d311c-c9a1-46c5-985f-95fb3ee3eabb	Janis.Thompson@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Janis Thompson	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
d60c8109-9ad8-41b0-814f-2dfb1b55efa8	Marjorie.Larson50@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Marjorie Larson	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
4abc7384-f45f-4921-b5c2-a53aeb10c529	Horacio_Bergnaum46@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Horacio Bergnaum	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
96f6b36b-afc1-4a58-889c-47f89ec1c717	Ressie_Murphy86@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Ressie Murphy	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
149c8b67-87ad-41bf-ab8f-d8534aab99e4	Robbie.Powlowski@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Robbie Powlowski	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
a1469b82-ebaf-4a95-a930-d9216ac7fa60	Ethan.OKeefe90@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Ethan O'Keefe	USER	f	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
0a149d3d-e786-4a4b-add7-458b1e60977a	Lysanne_Walsh49@gmail.com	$2b$10$QIzMSrguQsJNhABXu.WN7ujSo.0rANztQsuNkekuIZNO7pH9FDz7y	Lysanne Walsh	USER	t	2026-03-10 08:45:30.989	2026-03-10 08:45:30.989
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
682963af-3fa9-4f30-ad38-9b153fab9cf3	10f239bac63a4d5567a660f49fc94f05e8725a2b9ccae03215c57aa6e4eda61c	2026-03-10 01:53:14.216031+00	20260104110523_init_user	\N	\N	2026-03-10 01:53:14.208556+00	1
cadb089a-ddc1-41df-bc3b-f86a5a5410c4	222d2081e8e8f90dd329cc1efd8da7a6d2a1e0f1a4ab914101cf5a39321f4f2f	2026-03-10 08:39:22.027054+00	20260310083921_add_section_table	\N	\N	2026-03-10 08:39:22.013222+00	1
38ef44dd-4f8d-4e4f-a19a-82b1c66ef202	ecd29a22236b4981a97c590761aba21105c819eb433580690fdb7dbd50cd6fe1	2026-03-11 01:46:20.522434+00	20260311014620_add_contact_table	\N	\N	2026-03-11 01:46:20.508121+00	1
30f35526-f8f7-4580-9bc8-14f26035e541	2ff8c9c09004e7d80f27809c5741b98ab29d2b2a19e345b02387d1c8a8012aed	2026-03-12 08:32:19.181711+00	20260312083219_add_category_product	\N	\N	2026-03-12 08:32:19.159876+00	1
\.


--
-- PostgreSQL database dump complete
--

\unrestrict 2aKnDWckC2Vb1c8ibaTmOHN5T2ZyYwYesb3HB0vgjwqbRgJ0mddlm2UZSmIFdoR

