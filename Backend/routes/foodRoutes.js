import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post(
  "/add",
  isAuthenticated,
  hasRole("admin", "super_admin"),
  upload.single("image"),
  addFood,
);

foodRouter.put(
  "/update/:id",
  isAuthenticated,
  hasRole("admin", "super_admin"),
  upload.single("image"),
  updateFood,
);
