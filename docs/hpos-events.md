# HP-OS event page links

Every published event returned by HP-OS is mapped to a MASS detail-page link.
The path uses a URL-safe encoding of the HP-OS `event_id`, for example
`/events/event-ZXZ0X21hc3NfYXV0dW1uX2Fzc2VtYmx5XzIwMjY`. Encoding the immutable
ID keeps links unique even when IDs contain punctuation or titles are shared,
and keeps the link stable if a title is edited later.
