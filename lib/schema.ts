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
import { relations, sql } from 'drizzle-orm';

export const mySchema = pgSchema('my_schema');

const singer = mySchema.table('singer', {
  userName: text('username').primaryKey(),
  name: text('name').notNull(),
  gender: char('gender', { length: 1 }),
  age: integer('age'),
  email: text('email').unique(),
  address: varchar('address', { length: 255 }),
  contactNo: varchar('contactNo', { length: 15 }),
  pfp: text('pfp').notNull(),
  upi_id: text('upi_id').notNull(),
  eventCount: integer('event_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

const event = mySchema.table(
  'event',
  {
    singerUserName: text('singer_username')
      .notNull()
      .references(() => singer.userName),
    eventNumber: integer('event_number').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    eventDate: date('eventDate').notNull(),
    eventTime: time('eventTime').notNull(),
    venue: text('venue').notNull(),
    ticketLink: text('ticketLink'),
    image: text('image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.singerUserName, table.eventNumber]
    })
  })
);

const songRequest = mySchema.table('song_request', {
  id: serial('id').primaryKey(),
  singerUserName: text('singer_username').notNull(),
  eventNumber: integer('event_number').notNull(),
  phoneNo: varchar('phone', { length: 15 }).notNull(),
  name: text('name').notNull(),
  dedicatedTo: text('dedicated_to'),
  payment: text('payment'),
  rating: integer('rating'),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Define relations
const singerRelations = relations(singer, ({ many }) => ({
  events: many(event)
}));

const eventRelations = relations(event, ({ one, many }) => ({
  singer: one(singer, {
    fields: [event.singerUserName],
    references: [singer.userName]
  }),
  songRequests: many(songRequest)
}));

const songRequestRelations = relations(songRequest, ({ one }) => ({
  event: one(event, {
    fields: [songRequest.singerUserName, songRequest.eventNumber],
    references: [event.singerUserName, event.eventNumber]
  })
}));

// Function to get the next event number for a singer
export async function getNextEventNumber(db: any, singerUserName: string) {
  const result = await db.transaction(async (tx: any) => {
    // Increment the event count and get the new value
    await tx
      .update(singer)
      .set({ eventCount: sql`${singer.eventCount} + 1` })
      .where(sql`${singer.userName} = ${singerUserName}`);

    const updatedSinger = await tx
      .select({ eventCount: singer.eventCount })
      .from(singer)
      .where(sql`${singer.userName} = ${singerUserName}`)
      .limit(1);

    return updatedSinger[0].eventCount;
  });

  return result;
}

// Function to create a new event
export async function createEvent(db: any, newEvent: NewEvent) {
  const nextEventNumber = await getNextEventNumber(db, newEvent.singerUserName);

  const createdEvent = await db
    .insert(event)
    .values({
      ...newEvent,
      eventNumber: nextEventNumber
    })
    .returning();

  return createdEvent[0];
}

export {
  singer,
  event,
  songRequest,
  singerRelations,
  eventRelations,
  songRequestRelations
};

// Types for select and insert operations
export type Singer = typeof singer.$inferSelect;
export type NewSinger = typeof singer.$inferInsert;

export type Event = typeof event.$inferSelect;
export type NewEvent = typeof event.$inferInsert;

export type SongRequest = typeof songRequest.$inferSelect;
export type NewSongRequest = typeof songRequest.$inferInsert;
