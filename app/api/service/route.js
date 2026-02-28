import { NextResponse } from 'next/server';

/**
 * Mocking the x402 Open Standard for Internet-Native Payments
 * between AI Agents.
 * 
 * If no payment is detected (e.g. via Authorization or proprietary header),
 * the server responds with HTTP 402 Payment Required.
 */
export async function GET(request) {
    // Check for mock payment token
    const authHeader = request.headers.get('Authorization');
    const hasPaid = authHeader === 'Bearer mock_paid_token';

    if (!hasPaid) {
        // 402 Payment Required response
        return NextResponse.json(
            {
                error: "Payment Required",
                message: "This AI service requires upfront payment via Monad.",
                paymentInfo: {
                    token: "MON",
                    amount: "0.05",
                    address: "0x123...abc",
                    network: "monadTestnet"
                }
            },
            { status: 402 }
        );
    }

    // If paid, return the actual service data
    return NextResponse.json({
        data: "Here is your valuable AI-generated data!",
        timestamp: new Date().toISOString()
    });
}
