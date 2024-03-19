import { LensClient, development } from "@lens-protocol/client";

async function fetchAllFollowers(profileId) {
  const client = new LensClient({
    environment: development,
  });

  let allFollowers = [];
  let hasNextPage = true;
  let cursor = null;

  try {
    while (hasNextPage) {
      const result = await client.profile.followers({
        of: profileId,
        cursor: cursor,
      });

      allFollowers = [...allFollowers, ...result.items];
      cursor = result.pageInfo.nextCursor;
      hasNextPage = !!cursor; // Check if there is a next page using the next cursor
    }
  } catch (error) {
    console.error("Failed to fetch followers:", error);
    throw error; // Rethrow or handle as needed
  }

  return allFollowers;
}

async function testFetchFollowers() {
  const client = new LensClient({
    environment: development,
  });

  try {
    const result = await client.profile.followers({
      of: "0x01af07", // Ensure this is your correct profile ID
    });
    // Log the followers, mapping over the items if they exist
    if (result.items && result.items.length > 0) {
      console.log(
        "Followers:",
        result.items.map((p) => p.handle)
      );
    } else {
      console.log("No followers found or unable to access followers.");
    }
  } catch (error) {
    console.error("Test fetch failed:", error);
  }
}

testFetchFollowers();
