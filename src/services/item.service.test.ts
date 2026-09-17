import {
  createItemService,
  deleteItemService,
  getItemService,
  getItemsService,
  updateItemService,
} from "./item.service";
import { ItemModel } from "../models";
import { Car } from "../interfaces";

jest.mock("../models", () => ({
  ItemModel: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  },
}));

const sampleItem: Car = {
  name: "Model 3",
  color: "red",
  gas: "electric",
  year: 2023,
  description: "A car",
  price: 40000,
};

describe("item.service", () => {
  it("creates an item", async () => {
    (ItemModel.create as jest.Mock).mockResolvedValue(sampleItem);

    const result = await createItemService(sampleItem);

    expect(ItemModel.create).toHaveBeenCalledWith(sampleItem);
    expect(result).toEqual(sampleItem);
  });

  it("lists all items", async () => {
    (ItemModel.find as jest.Mock).mockResolvedValue([sampleItem]);

    const result = await getItemsService();

    expect(ItemModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([sampleItem]);
  });

  it("gets an item by id", async () => {
    (ItemModel.findById as jest.Mock).mockResolvedValue(sampleItem);

    const result = await getItemService("64f0000000000000000000a1");

    expect(ItemModel.findById).toHaveBeenCalledWith({
      _id: "64f0000000000000000000a1",
    });
    expect(result).toEqual(sampleItem);
  });

  it("updates an item and returns the updated document", async () => {
    const updated = { ...sampleItem, price: 41000 };
    (ItemModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updated);

    const result = await updateItemService("64f0000000000000000000a1", updated);

    expect(ItemModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "64f0000000000000000000a1" },
      updated,
      { new: true }
    );
    expect(result).toEqual(updated);
  });

  it("deletes an item", async () => {
    (ItemModel.findOneAndDelete as jest.Mock).mockResolvedValue(sampleItem);

    const result = await deleteItemService("64f0000000000000000000a1");

    expect(ItemModel.findOneAndDelete).toHaveBeenCalledWith({
      _id: "64f0000000000000000000a1",
    });
    expect(result).toEqual(sampleItem);
  });
});
