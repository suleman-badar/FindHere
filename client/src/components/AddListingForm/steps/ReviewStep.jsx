import { Card, CardContent, Typography, Button, Divider } from "@mui/material";

export default function ReviewStep({ formData, prevStep, handleSubmit, loading }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Review & Submit</Typography>

                <div className="space-y-2">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Cuisine:</strong> {formData.cuisine.join(", ")}</p>
                    <p><strong>Established:</strong> {formData.establishedYear}</p>
                    <Divider className="my-2" />
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Website:</strong> {formData.website}</p>
                    <Divider className="my-2" />
                    <p><strong>Address:</strong> {formData.address}</p>
                    <p><strong>Location:</strong> {formData.location.join(", ")}</p>
                    <Divider className="my-2" />
                    <p><strong>Average Price:</strong> {formData.avgPrice}</p>
                    <p><strong>Payment Methods:</strong> {formData.paymentMethods.join(", ")}</p>
                    <p><strong>Services:</strong> {formData.services.join(", ")}</p>
                    <Divider className="my-2" />
                    <p><strong>Tags:</strong> {formData.tags.join(", ")}</p>
                    <p><strong>Amenities:</strong> {formData.amenities.join(", ")}</p>
                    <Divider className="my-2" />
                    <p><strong>Images:</strong> {formData.images.length} file(s) selected</p>
                </div>

                <div className="flex justify-between mt-6 items-center">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    {loading && <p>Submitting...</p>}
                    <Button variant="contained" color="green" onClick={handleSubmit}>
                        Submit Listing
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
