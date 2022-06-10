using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarketKurly_CloneCoding.Models
{
    public class Member
    {
        [Key]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(128)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [MaxLength(4)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1)]
        public string Sex { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(11)]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(30)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(20)]
        public string OtherAddress { get; set; } = string.Empty;

        [MaxLength(8)]
        public string BirthDay { get; set; } = string.Empty;
    }
}