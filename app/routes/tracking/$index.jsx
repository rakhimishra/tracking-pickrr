import { Link, redirect, useLoaderData } from 'remix';
import { getTrackingDetails } from '~/utils/server.query';
// import { db } from '~/utils/db.server';
// import { getUser } from '~/utils/session.server';

export const loader = async ({ request, params }) => {
  console.log(params, 'params');
  try {
    const response = await fetch(
      `https://cfapi.pickrr.com/plugins/tracking/?tracking_id=${params.index}`
    );
    const data = await response.json();

    // console.log('data ==>', data);
    // return json(await data.json());
    return data;
  } catch (error) {
    console.log('error', error);
    return [];
  }
};

function TrackingDetails() {
  const data = useLoaderData();
  return (
    <div>
      <div>Tracking Details</div>
      <div>{data.product_name}</div>
    </div>
  );
}

export default TrackingDetails;
