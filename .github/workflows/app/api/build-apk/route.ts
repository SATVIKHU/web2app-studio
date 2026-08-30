import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, appName, packageName } = body;

    // Trigger GitHub Action Build Engine
    const GITHUB_TOKEN = process.env.GITHUB_BUILD_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER || 'SATVIK'; 
    const REPO_NAME = 'web2app-studio';

    if (GITHUB_TOKEN) {
      await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'build-apk',
          client_payload: { app_url: url, app_name: appName, package_name: packageName }
        })
      });
    }

    return NextResponse.json({ success: true, message: "Build initiated successfully in cloud engine." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to start build." }, { status: 500 });
  }
}
