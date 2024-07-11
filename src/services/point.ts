import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

async function getPoints() {
  const {
    data: points,
    error,
    status,
  } = await supabase.from("users").select("*");

  return { points, error, status };
}

async function createPoint({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) {
  const {
    data: findData,
    error: findError,
    status: findStatus,
  } = await supabase.from("users").select("*").eq("address", address);

  if (findError) {
    return { error: findError, status: findStatus, points: null };
  }

  if (findData?.length > 0) {
    const {
      data: updatePoints,
      error: updateError,
      status: updateStatus,
    } = await supabase
      .from("users")
      .update({
        amount: findData[0].amount + amount,
      })
      .eq("address", address);

    return { points: updatePoints, error: updateError, status: updateStatus };
  } else {
    const {
      data: points,
      status,
      error,
    } = await supabase.from("users").insert({
      amount: amount,
      point: 0,
      address: address,
      created_at: Date.now(),
    });

    return { points, error, status };
  }
}

async function withdrawPoint({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) {
  const {
    data: findData,
    error: findError,
    status: findStatus,
  } = await supabase.from("users").select("*").eq("address", address);

  if (findError) {
    return { error: findError, status: findStatus, points: null };
  }

  const {
    data: updatePoints,
    error: updateError,
    status: updateStatus,
  } = await supabase
    .from("users")
    .update({
      amount: findData[0].amount - amount,
    })
    .eq("address", address);

  return { points: updatePoints, error: updateError, status: updateStatus };
}

async function calculatePoints({ address }: { address: string }) {
  const {
    data: points,
    error,
    status,
  } = await supabase.from("users").select("*").eq("address", address);

  if (error || points.length === 0) {
    return { error, status, points };
  }

  let totalPoints = points[0].point;

  const timeElapsed =
    (Math.floor(Date.now() / 1000) - Math.floor(points[0].created_at / 1000)) /
    3600;
  const pointsT = points[0].amount * 0.5 * timeElapsed;
  totalPoints += pointsT;
  let updateDate = Date.now();

  const {
    data: updatePoints,
    error: updateError,
    status: updateStatus,
  } = await supabase
    .from("users")
    .update({
      point: totalPoints,
      created_at: updateDate,
    })
    .eq("address", address);

  return { points: updatePoints, error: updateError, status: updateStatus };
}

async function getPointsByAddress({ address }: { address: string }) {
  const {
    data: points,
    error,
    status,
  } = await supabase.from("users").select("*").eq("address", address);

  return { points, error, status };
}

async function totalBalance() {
  const {
    data: points,
    error,
    status,
  } = await supabase.from("users").select("amount");

  const totalBalance =
    points?.reduce((acc, point) => {
      return acc + (point.amount || 0); // Ensure point.amount is a number
    }, 0) || 0; // Default to 0 if points is null or undefined

  return { totalBalance, error, status };
}

export {
  getPoints,
  createPoint,
  getPointsByAddress,
  calculatePoints,
  withdrawPoint,
  totalBalance,
};
