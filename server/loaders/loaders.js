import DataLoader from "dataloader";
import { User, Company } from "./database/models.js";

export const createLoaders = () => ({
  userLoader: new DataLoader(async (ids) => {
    const users = await User.find({ _id: { $in: ids } });
    const map = new Map(users.map(u => [u._id.toString(), u]));
    return ids.map(id => map.get(id.toString()) || null);
  }),

  companyLoader: new DataLoader(async (ids) => {
    const companies = await Company.find({ _id: { $in: ids } });
    const map = new Map(companies.map(c => [c._id.toString(), c]));
    return ids.map(id => map.get(id.toString()) || null);
  }),

  usersByCompanyLoader: new DataLoader(async (companyIds) => {
    const users = await User.find({ companyId: { $in: companyIds } });
    return companyIds.map(cid =>
      users.filter(u => u.companyId?.toString() === cid.toString())
    );
  }),
});
