# Email Requester

This application handles incoming email requests by publishing over google pubsub. The actual sending of the emails 
happens outside of this service (there is a consumer which reads the messages off the bus and sends them).
