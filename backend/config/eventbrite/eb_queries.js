    const eb_queries = {

        /**
         * Public Fields
         * Field Type Description
         * @name	multipart-text	Event name.
         * @summary	string	(Optional) Event summary. Short summary describing the event and its purpose.
         * @description	multipart-text	(Optional) Event description. Description can be lengthy and have significant formatting.
         * @url	string	URL of the Event's Listing page on eventbrite.com.
         * @start	datetime-tz	Event start date and time.
         * @end	datetime-tz	Event end date and time.
         * @created	datetime	Event creation date and time.
         * @changed	datetime	Date and time of most recent changes to the Event.
         * @published	datetime	Event publication date and time.
         * @status	string	Event status. Can be draft, live, started, ended, completed and canceled.
         * @currency	string	Event ISO 4217 currency code.
         * @online_event	boolean	true = Specifies that the Event is online only (i.e. the Event does not have a Venue).
         * @hide_start_date	boolean	If true, the event's start date should never be displayed to attendees.
         * @hide_end_date	boolean	If true, the event's end date should never be displayed to attendees.

         * Private Fields    Use these fields to specify properties of an Event that are only available to the User.
         * Field	Type	Description
         * @listed	boolean	true = Allows the Event to be publicly searchable on the Eventbrite website.
         * @shareable	boolean	true = Event is shareable, by including social sharing buttons for the Event to Eventbrite applications.
         * @invite_only	boolean	true = Only invitees who have received an email inviting them to the Event are able to see Eventbrite applications.
         * @show_remaining	boolean	true = Provides, to Eventbrite applications, the total number of remaining tickets for the Event.
         * @password	string	Event password used by visitors to access the details of the Event.
         * @capacity	integer	Maximum number of tickets for the Event that can be sold to Attendees. The total capacity is calculated by the sum of the quantity_total of the Ticket Class.
         * @capacity_is_custom	boolean	true = Use custom capacity value to specify the maximum number of Attendees for the Event. False = Calculate the maximum number of Attendees for the Event from the total of all Ticket Class capacities.
         */
        create_event: function (event_info) {

            // public
            event_info.event_name
            event_info.description
            event_info.url
            event_info.start
            event_info.end
            event_info.status = "live";
            event_info.currency = "840";
            event_info.online_event = false;
            event_info.hide_start_date = false;
            event_info.hide_end_date = false;

            // private
            event_info.listed = true;
            event_info.shareable = true;
            event_info.invite_only = false;
            event_info.show_remaining;
            event_info.capacity;

            console.log(event_info)
        }
    }

    module.exports = eb_queries;