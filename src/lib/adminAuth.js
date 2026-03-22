import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * requireAdmin — wraps any admin API handler.
 * Returns 401 if no valid session exists.
 *
 * Usage:
 *   export default requireAdmin(async (req, res) => { ... });
 */
export function requireAdmin(handler) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorised" });
    }
    return handler(req, res);
  };
}

/**
 * withMethod — ensures only the specified HTTP methods are accepted.
 * Returns 405 for anything else.
 */
export function withMethod(methods, handler) {
  return async (req, res) => {
    if (!methods.includes(req.method)) {
      res.setHeader("Allow", methods.join(", "));
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
    return handler(req, res);
  };
}

/**
 * Combine multiple wrappers — apply right-to-left.
 */
export function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}
