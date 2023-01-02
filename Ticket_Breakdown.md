# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions:
- `Agents` table has the agents meta info
- `Facilities` table has the facilities info
- There is a many-to-many relationship between Agents and Facilities led to a pivot table `Shifts`
- `Shifts` table holds shifts info, agent_id, and facility_id.

> If my guess is correct, I will have to add at least these tickets

### Tickets

#### Generate a unique custom_id for each agent

- Write a function that can generate unique alphanumerical string with the given length
- Name this function `generateUniqueId` and it should takes a number `length` with default 6.


#### Add custom_id column to the agents table

- Add a new column that can save a string with length 6 chars.
- Add a unique index to the `Agents` table for this column.


#### Seed the new column custom_id

- Seed the old Agents with the new custom_ids
- Use the `generateUniqueId` function to fill this field


#### Use the new custom_id to generate the reports

- Refactor the `getShiftsByFacility` to use the `custom_id` instead of the primary key id
- Add the `custom_id` to the returned meta_info from the `Agents` table.

#### Add custom_id to the new registered/added agents

- Call `generateUniqueId` function to generate a unique id
- Assign this unique id to this new column `custom_id`