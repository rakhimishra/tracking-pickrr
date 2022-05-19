import { Link, redirect, useLoaderData } from 'remix';
import { getTrackingDetails } from '~/utils/server.query';
// import { db } from '~/utils/db.server';
// import { getUser } from '~/utils/session.server';

export const loader = async ({ request, params }) => {
  console.log(params);
  const data = await getTrackingDetails(params);

  if (!data) throw new Error('Tracking not found');

  return data;
};

function TrackingDetails() {
  const { data } = useLoaderData();

  return (
    <div>
      <div>Tracking Details</div>
    </div>
  );
}

export default TrackingDetails;
  