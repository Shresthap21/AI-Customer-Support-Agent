import { useEffect, useState } from "react";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="tickets-page">Loading tickets...</div>;
  }

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <div>
          <h1>Support Tickets</h1>
          <p>Issues that require further investigation</p>
        </div>

        <div className="ticket-count">
          {tickets.length} {tickets.length === 1 ? "Ticket" : "Tickets"}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <h2>No tickets yet</h2>
          <p>
            Unresolved customer issues will appear here.
          </p>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <div className="ticket-top">
                <div>
                  <span className="ticket-id">
                    #{ticket.id}
                  </span>

                  <h2>{ticket.issue}</h2>
                </div>

                <span className="status-badge">
                  {ticket.status}
                </span>
              </div>

              <div className="ticket-details">
                <div>
                  <span>Category</span>
                  <strong>{ticket.category}</strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{ticket.priority}</strong>
                </div>

                <div>
                  <span>Created</span>
                  <strong>
                    {new Date(ticket.createdAt).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tickets;