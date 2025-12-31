import {
	mysqlTable,
	int,
	varchar,
	datetime,
	timestamp,
	date,
	time,
	decimal
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	username: varchar('username', { length: 32 }).notNull().unique(),
	email: varchar('email', { length: 50 }).notNull().unique(),

	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const bookings = mysqlTable('bookings', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull(),
	email: varchar('email', { length: 50 }).notNull(),
	partySize: int('party_size').notNull(),
	date: date('date').notNull(),
	time: time('time').notNull(),
	phone: varchar('phone', { length: 20 }),
	notes: varchar('notes', { length: 1024 }),
	status: varchar('status', { length: 32 }).notNull().default('pending'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const menuCategory = mysqlTable('category', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	description: varchar('description', { length: 255 })
});

export const menu = mysqlTable('menu', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
	image: varchar('image', { length: 100 }),
	categoryId: int('category_id')
		.notNull()
		.references(() => menuCategory.id, { onDelete: 'set null' }),
	description: varchar('description', { length: 255 }),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const contactMessages = mysqlTable('contact_messages', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull(),
	email: varchar('email', { length: 50 }).notNull(),
	phone: varchar('phone', { length: 20 }),
	messages: varchar('messages', { length: 1024 }),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
