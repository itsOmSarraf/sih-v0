import {
  char,
  date,
  integer,
  pgSchema,
  pgTable,
  serial,
  text,
  time,
  varchar
} from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('my_schema');

const singer = mySchema.table('singer', {
  id: serial('id').primaryKey(),
  name: text('name'),
  gender: char('gender'),
  age: integer('age'),
  email: text('email'),
  address: varchar('address'),
  contactNo: varchar('contactNo', { length: 10 }),
  pfp: text('pfp'),
  upi_id: text('upi_id')
});

const event = mySchema.table('event', {
  id: serial('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  eventDate: date('eventDate'),
  eventTime: time('eventTime'),
  venue: text('venue'),
  ticketLink: text('ticketLink'),
  image: text('image'),
  singer: text('singer').references(() => singer.id)
});

const songReq = mySchema.table('songReq', {
  id: serial('id').primaryKey(),
  eventId: integer('eventId').references(() => event.id),
  phoneNo: integer('phone'),
  name: text('name'),
  dedicated_To: text('dedicatedTo'),
  payment: text('payment'),
  rating: integer('rating')
});

export { singer, event, songReq };
