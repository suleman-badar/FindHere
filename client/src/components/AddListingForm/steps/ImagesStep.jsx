import { Card, CardContent, Typography, Button } from "@mui/material";
import Loader from "../../Loader";
import { useEffect } from "react";

export default function ImagesStep({ formData, setFormData, errors = {}, prevStep, handleSubmit, loading }) {

    useEffect(() => {
        return () => {
            formData.images?.forEach((file) => {
                if (file instanceof File) URL.revokeObjectURL(file);
            });
        };
    }, [formData.images]);
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Upload Images</Typography>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="fileUpload"
                    className="hidden"
                    onChange={(e) => setFormData("images", Array.from(e.target.files))}
                />
                <label
                    htmlFor="fileUpload"
                    className="flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Select Images
                </label>

                {formData?.images?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                        {formData.images.map((file, idx) => {
                            let url;
                            if (file instanceof File) url = URL.createObjectURL(file);
                            else if (typeof file === "string") url = file;
                            else return null;
                            return (
                                <img key={idx} src={url} alt={`preview ${idx}`} className="w-24 h-24 object-cover rounded-lg border" />
                            );
                        })}
                    </div>
                )}

                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

                <div className="flex justify-between mt-6 items-center">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    {loading && <Loader />}
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Submit
                    </Button>

                </div>
            </CardContent>
        </Card>
    );
}
