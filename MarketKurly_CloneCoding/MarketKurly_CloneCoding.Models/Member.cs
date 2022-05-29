using System.ComponentModel.DataAnnotations;

namespace MarketKurly_CloneCoding.Models
{
    public class Member
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        [Required]
        [MaxLength(4)]
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        [MaxLength(20)]
        public string Email { get; set; } = string.Empty;
        [MaxLength(11)]
        public string PhoneNumber { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Address { get; set; } = string.Empty;
        public DateTime BirthDay { get; set; }
    }
}