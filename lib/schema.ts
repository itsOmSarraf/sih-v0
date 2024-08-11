import {
  char,
  date,
  integer,
  pgTable,
  serial,
  text,
  time,
  varchar
} from 'drizzle-orm/pg-core';
import { string } from 'prop-types';

const singer = pgTable('singer', {
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

const event = pgTable('event', {
  id: text('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  eventDate: date('eventDate'),
  eventTime: time('eventTime'),
  venue: text('venue'),
  ticketLink: text('ticketLink'),
  image: text('image'),
  singer: text('singer').references(() => singer.id)
});

const songReq = pgTable('songReq', {
  id: text('id').references(() => event.id),
  phoneNo: integer('phone'),
  name: text('name'),
  dedicated_To: text('dedicatedTo'),
  payment: text('payment'),
  rating: integer('ratting')
});

export { singer, event, songReq };
