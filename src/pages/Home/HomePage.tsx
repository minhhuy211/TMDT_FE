import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowUp } from "lucide-react";
import {Category} from "@/model/Category.ts";
import {useQuery} from "@tanstack/react-query";
import categoryApi from "@/services/categoryApi.ts";
import {Product} from "@/model/Product.ts";
import ProductCard from "@/pages/Products/ProductCard.tsx";

export const HomePage = () => {

  const [selectedCateId, setSelectedCateId] = useState<string | null>(null);

  const { data: categories = [], isLoading: loadingCate } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: categoryApi.getCategories,
  });

  // Tính productList hiển thị
  let productList: Product[] = [];
  if (categories.length > 0) {
    if (selectedCateId) {
      const selectedCate = categories.find((c) => c.cate_ID === selectedCateId);
      productList = selectedCate?.productList || [];
    } else {
      productList = categories.flatMap((c) => c.productList ?? []).filter(Boolean);
    }
  }
  return (
      <main className="flex-1 ">
        {/* Promotion Banner */}
        <div className="bg-black text-white text-center py-2 text-sm">
          <p>Giảm 10% cho lần đầu mua</p>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-100 to-white py-12">
          <div className="mx-16 grid md:grid-cols-2 gap-8 items-center px-4">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold">
                Thiết kế của bạn,
                <br/>
                in ấn hoàn hảo!
              </h1>
              <p className="text-gray-600">6,000+ khách hàng hài lòng</p>
              <div className="flex gap-4">
                <Button className="rounded-full px-6 bg-black hover:bg-gray-800">Thiết kế</Button>
                <Button variant="outline" className="rounded-full px-6 border-black text-black hover:bg-gray-100">
                  Sản phẩm
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative bg-gray-100 rounded-lg p-6">
                <img
                    src="https://img.staticdj.com/c6d8abbb4916a5bf0f9708adfdfc4e0c_2560x.jpg?height=300&width=400"
                    alt="Ender-3 V3 KE 3D Printer"
                    width={400}
                    height={400}
                    className="object-cover"
                />
                {/* <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                  <h3 className="font-bold">Ender-3 V3 KE</h3>
                  <p className="text-sm text-gray-600">3D Printing, Smarter and Faster</p>
                  <div className="flex gap-2 mt-2">
                    <div className="bg-gray-100 p-1 rounded">
                      <img src="/placeholder.svg?height=20&width=20" alt="Feature" width={20} height={20} />
                    </div>
                    <div className="bg-gray-100 p-1 rounded">
                      <img src="/placeholder.svg?height=20&width=20" alt="Feature" width={20} height={20} />
                    </div>
                    <div className="bg-gray-100 p-1 rounded">
                      <img src="/placeholder.svg?height=20&width=20" alt="Feature" width={20} height={20} />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16">
          <div className="mx-16 px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bạn thích tạo ra thứ gì?</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Khởi nguồn sáng tạo bắt đầu từ một thành phẩm thực và công nghệ in 3D tiên tiến - Đủ chính xác, chất lượng
              vượt trội, đáp ứng mọi nhu cầu thiết kế của bạn!
            </p>
            <div className="flex overflow-x-auto gap-4 pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
              <Button
                  variant={!selectedCateId ? "default" : "outline"}
                  className="rounded-full whitespace-nowrap"
                  onClick={() => setSelectedCateId(null)}
              >
                Tất cả ({productList.length} Sản phẩm)
              </Button>
              {categories.map((cate) => (
                  <Button
                      key={cate.cate_ID}
                      variant={selectedCateId === cate.cate_ID ? "default" : "outline"}
                      className="rounded-full whitespace-nowrap"
                      onClick={() => setSelectedCateId(cate.cate_ID)}
                  >
                    {cate.name} ({cate.productList?.length ?? 0})
                  </Button>
              ))}
            </div>
            {/* Product List */}
            <section className="py-16">
              <div className="mx-16 px-4">
                {/* ... filter button ... */}
                {loadingCate ? (
                    <div>Đang tải danh mục...</div>
                ) : productList.length === 0 ? (
                    <div>Không có sản phẩm nào</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {productList.map((prod) => (
                          <ProductCard product={prod} key={prod.productId}/>
                      ))}
                    </div>
                )}
              </div>
            </section>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-gray-50 rounded-lg mx-4 md:mx-8">
          <div className="mx-16 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Quy trình 3 bước</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Từ thiết kế đến giao hàng - Chúng tôi đảm bảo khách hàng tận hưởng sự đơn giản và thành công
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <ArrowUp className="h-6 w-6"/>
                </div>
                <h3 className="font-bold">TẢI THIẾT KẾ</h3>
                <p className="text-gray-600">
                  Tải mô hình thiết kế của bạn lên hoặc sử dụng các mẫu có sẵn từ thư viện của chúng tôi
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <img src="/placeholder.svg?height=24&width=24" alt="Choose" width={24} height={24}/>
                </div>
                <h3 className="font-bold">CHỌN SẢN PHẨM</h3>
                <p className="text-gray-600">
                  Lựa chọn vật liệu, màu sắc, độ phân giải và các tùy chọn khác phù hợp với nhu cầu của bạn
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <img src="/placeholder.svg?height=24&width=24" alt="Delivery" width={24} height={24}/>
                </div>
                <h3 className="font-bold">GIAO HÀNG</h3>
                <p className="text-gray-600">
                  Chúng tôi sẽ in và giao sản phẩm đến tận nơi cho bạn với thời gian nhanh chóng
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="mx-16 px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                  Tính năng nổi bật
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  In ấn chất lượng, <br/>
                  không thỏa hiệp
                </h2>
                <p className="text-gray-600 mb-8">
                  Chúng tôi cam kết mang đến cho bạn các sản phẩm in 3D chất lượng cao với đầy đủ tính năng vượt trội
                </p>

                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2">No Minimum Orders</h3>
                    <p className="text-gray-600">Không có số lượng đặt hàng tối thiểu - đặt hàng bao nhiêu tùy ý</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2">Fast Production</h3>
                    <p className="text-gray-600">Thời gian sản xuất nhanh chóng, đảm bảo giao hàng đúng hẹn</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2">Premium Materials</h3>
                    <p className="text-gray-600">Sử dụng vật liệu cao cấp, đảm bảo độ bền và chất lượng sản phẩm</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-2">Eco-Friendly Options</h3>
                    <p className="text-gray-600">Cung cấp các lựa chọn vật liệu thân thiện với môi trường</p>
                  </div>
                </div>

                <Button className="mt-8 rounded-full px-6 bg-black hover:bg-gray-800">Xem thêm về dịch vụ</Button>
              </div>
              <div className="flex justify-center items-center">
                <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="3D Printer Features"
                    width={400}
                    height={400}
                    className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="mx-16 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Các khách hàng nói gì?</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Dưới đây là một số đánh giá từ khách hàng đã trải nghiệm dịch vụ của chúng tôi. Chúng tôi luôn nỗ lực để
              đáp ứng và vượt quá mong đợi của khách hàng.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "Chất lượng in ấn tuyệt vời, chi tiết sắc nét và dịch vụ khách hàng rất tận tâm. Tôi rất hài lòng
                    với sản phẩm nhận được."
                  </p>
                  <div className="pt-4 border-t">
                    <div className="font-medium">Nguyễn Văn A</div>
                    <div className="text-sm text-gray-500">Hà Nội</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "Thời gian giao hàng nhanh hơn dự kiến và chất lượng sản phẩm vượt quá mong đợi của tôi. Chắc chắn
                    sẽ quay lại."
                  </p>
                  <div className="pt-4 border-t">
                    <div className="font-medium">Trần Thị B</div>
                    <div className="text-sm text-gray-500">TP. Hồ Chí Minh</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "Đội ngũ hỗ trợ rất chuyên nghiệp và nhiệt tình. Họ đã giúp tôi điều chỉnh thiết kế để có kết quả
                    tốt nhất."
                  </p>
                  <div className="pt-4 border-t">
                    <div className="font-medium">Lê Văn C</div>
                    <div className="text-sm text-gray-500">Đà Nẵng</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
  )
};