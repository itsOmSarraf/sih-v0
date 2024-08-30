import {
  char,
  date,
  integer,
  pgSchema,
  serial,
  text,
  time,
  varchar,
  timestamp,
  primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const mySchema = pgSchema('my_schema');

// const singer = mySchema.table('singer', {
//   userName: text('username').primaryKey(),
//   name: text('name').notNull(),
//   gender: char('gender', { length: 1 }),
//   age: integer('age'),
//   email: text('email').unique(),
//   address: varchar('address', { length: 255 }),
//   contactNo: varchar('contactNo', { length: 15 }),
//   pfp: text('pfp').notNull(),
//   upi_id: text('upi_id').notNull(),
//   eventCount: integer('event_count').default(0).notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull()
// });

// const event = mySchema.table(
//   'event',
//   {
//     singerUserName: text('singer_username')
//       .notNull()
//       .references(() => singer.userName),
//     eventNumber: integer('event_number').notNull(),
//     name: text('name').notNull(),
//     description: text('description'),
//     eventDate: date('eventDate').notNull(),
//     eventTime: time('eventTime').notNull(),
//     venue: text('venue').notNull(),
//     ticketLink: text('ticketLink'),
//     image: text('image'),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//     updatedAt: timestamp('updated_at').defaultNow().notNull()
//   },
//   (table) => ({
//     compositePk: primaryKey({
//       columns: [table.singerUserName, table.eventNumber]
//     })
//   })
// );

// const songAdd = mySchema.table('songs', {
//   id: serial('id').primaryKey(),
//   songName: text('songName').notNull(),
//   artistName: text('artistName').notNull()
// });

// const songRequest = mySchema.table('song_request', {
//   id: serial('id').primaryKey(),
//   singerUserName: text('singer_username').notNull(),
//   eventNumber: integer('event_number').notNull(),
//   phoneNo: varchar('phone', { length: 15 }).notNull(),
//   name: text('name').notNull(),
//   dedicatedTo: text('dedicated_to'),
//   payment: text('payment'),
//   rating: integer('rating'),
//   status: text('status').default('pending').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull()
// });

// // Define relations
// const singerRelations = relations(singer, ({ many }) => ({
//   events: many(event)
// }));

// const eventRelations = relations(event, ({ one, many }) => ({
//   singer: one(singer, {
//     fields: [event.singerUserName],
//     references: [singer.userName]
//   }),
//   songRequests: many(songRequest)
// }));

// const songRequestRelations = relations(songRequest, ({ one }) => ({
//   event: one(event, {
//     fields: [songRequest.singerUserName, songRequest.eventNumber],
//     references: [event.singerUserName, event.eventNumber]
//   })
// }));

// export {
//   singer,
//   event,
//   songRequest,
//   singerRelations,
//   eventRelations,
//   songRequestRelations,
//   songAdd
// };

// // Types for select and insert operations
// export type Singer = typeof singer.$inferSelect;
// export type NewSinger = typeof singer.$inferInsert;

// export type Event = typeof event.$inferSelect;
// export type NewEvent = typeof event.$inferInsert;

// export type SongRequest = typeof songRequest.$inferSelect;
// export type NewSongRequest = typeof songRequest.$inferInsert;

// export type Songs = typeof songRequest.$inferSelect;
// export type SongsAdd = typeof songRequest.$inferInsert;
